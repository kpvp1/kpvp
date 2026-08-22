import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      return NextResponse.json(
        { error: "Telegram environment variables missing" },
        { status: 500 }
      );
    }

    // आज की तारीख — India
    const now = new Date();

    const parts = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }).formatToParts(now);

    const month = Number(
      parts.find((p) => p.type === "month")?.value
    );

    const day = Number(
      parts.find((p) => p.type === "day")?.value
    );

    // केवल Approved members
    const { data: members, error } = await supabase
      .from("members")
      .select("id, member_name, village, profession, dob")
      .eq("status", "Approved")
      .not("dob", "is", null);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // आज birthday वाले members
    const birthdayMembers = (members || []).filter((member) => {
      if (!member.dob) return false;

      const dobString = String(member.dob);

      // YYYY-MM-DD से सीधे month/day निकालना
      const dobParts = dobString.split("-");

      if (dobParts.length !== 3) return false;

      const dobMonth = Number(dobParts[1]);
      const dobDay = Number(dobParts[2]);

      return dobMonth === month && dobDay === day;
    });

    // आज कोई birthday नहीं
    if (birthdayMembers.length === 0) {
      return NextResponse.json({
        success: true,
        count: 0,
        message: "आज किसी Approved member का birthday नहीं है।",
      });
    }

    // Birthday message
    let message = `🎊🎂 <b>आज का जन्मदिन</b> 🎂🎊

🙏 <b>कांटा परगना विकास परिषद</b> 🙏
<b>52 गाँव • एक परिवार</b>

━━━━━━━━━━━━━━━━━━

🌸 <b>जन्मदिन की हार्दिक शुभकामनाएँ</b> 🌸

`;

    birthdayMembers.forEach((member, index) => {
      message += `🎂 <b>${index + 1}. ${member.member_name}</b>
🏠 ग्राम : ${member.village}
💼 व्यवसाय : ${member.profession || "उल्लेख नहीं किया गया"}
🎂 जन्मदिन : ${day} ${new Intl.DateTimeFormat("hi-IN", {
        month: "long",
        timeZone: "Asia/Kolkata",
      }).format(now)}

`;
    });

    message += `━━━━━━━━━━━━━━━━━━

🌺 <b>कांटा परगना विकास परिषद परिवार</b> की ओर से सभी जन्मदिन वाले सदस्यों को हार्दिक शुभकामनाएँ। 🌺

ईश्वर आपको सुख, समृद्धि, उत्तम स्वास्थ्य एवं दीर्घायु प्रदान करें। 🙏

🎉 आपका जीवन खुशियों से भरा रहे और आपका जीवन खुशियों से सदैव भरा रहे।

━━━━━━━━━━━━━━━━━━
🕉️ <b>KPVP • 52 गाँव • एक परिवार</b>`;

    // Telegram
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
        }),
      }
    );

    const telegramData = await response.json();

    if (!telegramData.ok) {
      return NextResponse.json(
        {
          error:
            telegramData.description ||
            "Telegram message failed",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      count: birthdayMembers.length,
      message: "Birthday notification Telegram पर भेज दिया गया।",
    });

  } catch (error) {
    console.error("Birthday error:", error);

    return NextResponse.json(
      { error: "Birthday notification failed" },
      { status: 500 }
    );
  }
}