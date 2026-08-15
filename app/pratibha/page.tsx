"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

export default function PratibhaPage() {
  const inputClass =
  "w-full p-4 rounded-xl border-2 border-blue-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition bg-white";
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [rules, setRules] = useState<any[]>([]);
const [categories, setCategories] = useState<any[]>([]);
const [registrationStatus, setRegistrationStatus] =
  useState("open");

const [closeMessage, setCloseMessage] =
  useState("");
  

  

  const [studentName, setStudentName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [village, setVillage] = useState("");
  const [mobile, setMobile] = useState("");
  const [category, setCategory] = useState("");
  const [percentage, setPercentage] = useState("");
  const [achievement, setAchievement] = useState("");

  const [photo, setPhoto] = useState<File | null>(null);
  const [marksheet, setMarksheet] = useState<File | null>(null);
  const [passingYear, setPassingYear] = useState("");
const [stream, setStream] = useState("");

const [department, setDepartment] = useState("");
const [post, setPost] = useState("");

const [currentDepartment, setCurrentDepartment] = useState("");
const [currentPost, setCurrentPost] = useState("");
const [newPost, setNewPost] = useState("");

const [sportsLevel, setSportsLevel] = useState("");
const [gameName, setGameName] = useState("");

const [retirementYear, setRetirementYear] = useState("");

const [otherDetails, setOtherDetails] = useState("");


async function loadRegistrationStatus() {

  const { data } = await supabase
    .from("website_settings")
    .select("*");

  if (!data) return;

  const status = data.find(
    (x) => x.setting_key === "pratibha_registration"
  );

  const message = data.find(
    (x) => x.setting_key === "pratibha_message"
  );

  if (status) {
    setRegistrationStatus(
      status.setting_value
    );
  }

  if (message) {
    setCloseMessage(
      message.setting_value
    );
  }
}
async function loadSettings() {
  const { data, error } = await supabase
    .from("pratibha_settings")
    .select("*");

  if (error) {
    console.log(error);
    return;
  }

  setRules(
    data.filter(
      (item) => item.setting_type === "rule"
    )
  );

  setCategories(
    data.filter(
      (item) => item.setting_type === "category"
    )
  );
}

useEffect(() => {
  loadSettings();
  loadRegistrationStatus();
}, []);


  async function submitForm() {

  // Common Required Fields
  if (
    !studentName ||
    !fatherName ||
    !village ||
    !mobile ||
    !category
  ) {
    setMessage("❌ सभी आवश्यक जानकारी भरें");
    return;
  }

  // Percentage Required Only For Academic Categories
  if (
    (category === "10th" ||
      category === "12th" ||
      category === "Graduation") &&
    !percentage
  ) {
    setMessage("❌ प्रतिशत दर्ज करें");
    return;
  }

  // Mobile Validation
  if (mobile.length !== 10) {
    setMessage("❌ सही 10 अंकों का मोबाइल नंबर दर्ज करें");
    return;
  }

  // Marksheet / Certificate Validation
  if (
    (category === "10th" ||
      category === "12th" ||
      category === "Graduation" ||
      category === "Sports") &&
    !marksheet
  ) {
    setMessage(
      category === "Sports"
        ? "❌ Sports Certificate Upload करना अनिवार्य है"
        : "❌ Marksheet Upload करना अनिवार्य है"
    );
    return;
  }


    setLoading(true);
    // DUPLICATE CHECK

const { data: existing } = await supabase
  .from("pratibha")
  .select("id")
  .eq("student_name", studentName)
  .eq("father_name", fatherName)
  .eq("village", village)
  .eq("mobile", mobile);

if (existing && existing.length > 0) {
  setMessage(
    "❌ इस नाम, पिता के नाम, ग्राम और मोबाइल नंबर से आवेदन पहले से मौजूद है"
  );
  setLoading(false);
  return;
}

    try {
      const registrationNo = "PS" + Date.now();

      // PHOTO UPLOAD
      let photoUrl = "";

if (photo) {
  const photoName =
    Date.now() + "-" + photo.name.replaceAll(" ", "_");

  const { error: photoError } = await supabase.storage
    .from("pratibha-photos")
    .upload(photoName, photo);

  if (photoError) throw photoError;

  const { data } = supabase.storage
    .from("pratibha-photos")
    .getPublicUrl(photoName);

  photoUrl = data.publicUrl;
}

     
      

      // MARKSHEET UPLOAD
      let marksheetUrl = "";

if (marksheet) {
  const marksheetName =
    Date.now() + "-" + marksheet.name.replaceAll(" ", "_");

  const { error: marksheetError } = await supabase.storage
    .from("pratibha-marksheets")
    .upload(marksheetName, marksheet);

  if (marksheetError) throw marksheetError;

  const { data: marksheetUrlData } = supabase.storage
    .from("pratibha-marksheets")
    .getPublicUrl(marksheetName);

  marksheetUrl = marksheetUrlData.publicUrl;
}

      // DATABASE INSERT
      const { error } = await supabase
        .from("pratibha")
        .insert([
          {
            passing_year: passingYear,
stream,
department,
post,
current_department: currentDepartment,
current_post: currentPost,
new_post: newPost,
sports_level: sportsLevel,
game_name: gameName,
retirement_year: retirementYear,
other_details: otherDetails,
            student_name: studentName,
            father_name: fatherName,
            village,
            mobile,
            category,
            percentage,
            achievement,
            
            marksheet_url: marksheetUrl,
            registration_no: registrationNo,
            status: "Pending",
            photo_url: photoUrl,
          },
        ]);

      if (error) throw error;

      setMessage(
        `✅ आवेदन सफलतापूर्वक जमा हो गया | Registration No: ${registrationNo}`
      );

      setStudentName("");
      setFatherName("");
      setVillage("");
      setMobile("");
      setCategory("");
      setPercentage("");
      setAchievement("");
      setPhoto(null);
      setMarksheet(null);
    } catch (err: any) {
      setMessage("❌ Error: " + err.message);
    }

    setLoading(false);
  }

  if (registrationStatus === "closed") {

  return (

    <main className="min-h-screen flex items-center justify-center p-6">

      <div className="bg-white rounded-3xl p-10 shadow-2xl max-w-2xl text-center">

        <div className="text-7xl mb-4">
          🚫
        </div>

        <h1 className="text-4xl font-bold text-red-600 mb-4">
          प्रतिभा सम्मान आवेदन बंद हैं
        </h1>

        <div className="text-xl text-gray-700 leading-8">
          {closeMessage}
        </div>

      </div>

    </main>

  );
}

 return (
    <main className="min-h-screen p-6 max-w-4xl mx-auto">

      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8">

        <h1 className="text-4xl font-bold text-yellow-300 text-center mb-4">
          🏆 प्रतिभा सम्मान आवेदन
        </h1>

        <div className="bg-yellow-100 text-black p-4 rounded-xl mb-6">
          

         {rules.map((rule) => (
  <p key={rule.id}>
    • {rule.value}
  </p>
))}


        </div>
        
        <div className="grid md:grid-cols-2 gap-5 mb-6">

  {/* Student Name */}
  <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4">
    <label className="block font-bold text-blue-800 mb-2">
      👨‍🎓 विद्यार्थी का नाम *
    </label>

    <input
      type="text"
      placeholder="विद्यार्थी का नाम"
      value={studentName}
      onChange={(e) => setStudentName(e.target.value)}
      className={inputClass}
    />
  </div>

  {/* Father Name */}
  <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-4">
    <label className="block font-bold text-green-800 mb-2">
      👨 पिता का नाम *
    </label>

    <input
      type="text"
      placeholder="पिता का नाम"
      value={fatherName}
      onChange={(e) => setFatherName(e.target.value)}
      className={inputClass}
    />
  </div>

  {/* Village */}
  <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-4">
    <label className="block font-bold text-yellow-800 mb-2">
      🏡 ग्राम *
    </label>

    <input
      type="text"
      placeholder="ग्राम का नाम"
      value={village}
      onChange={(e) => setVillage(e.target.value)}
      className={inputClass}
    />
  </div>

  {/* Mobile */}
  <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-4">
    <label className="block font-bold text-purple-800 mb-2">
      📱 मोबाइल नंबर *
    </label>

    <input
      type="text"
      maxLength={10}
      placeholder="मोबाइल नंबर"
      value={mobile}
      onChange={(e) => setMobile(e.target.value)}
      className={inputClass}
    />
  </div>

</div>

<div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-2xl border">
  <label className="font-bold text-blue-900 block mb-2">
    🎯 श्रेणी चुनें
  </label>

  <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    className={inputClass}
  >
    <option value="">
  श्रेणी चुनें
</option>

    {categories.map((item) => (
  <option
    key={item.id}

    value={item.value}
  >
    {item.value}

  </option>
))}
  </select>
</div>

  {(category === "10th" || category === "12th") && (
  <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-5 mt-4">
    <h3 className="font-bold text-green-800 mb-4">
      📚 शैक्षणिक विवरण
    </h3>

    <div className="grid md:grid-cols-2 gap-4">
      <input
        type="number"
        placeholder="प्रतिशत (%)"
        value={percentage}
        onChange={(e) => setPercentage(e.target.value)}
        className={inputClass}
      />

      <input
        type="number"
        placeholder="Passing Year"
        value={passingYear}
        onChange={(e) => setPassingYear(e.target.value)}
        className={inputClass}
      />

      {category === "12th" && (
        <input
          type="text"
          placeholder="Arts / Science / Commerce"
          value={stream}
          onChange={(e) => setStream(e.target.value)}
          className={inputClass}
        />
      )}
    </div>
  </div>
)}

{category === "Graduation" && (
  <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-5 mt-4">
    <h3 className="font-bold text-green-800 mb-4">
      🎓 स्नातक विवरण
    </h3>

    <div className="grid md:grid-cols-2 gap-4">
      <input
        type="number"
        placeholder="प्रतिशत (%)"
        value={percentage}
        onChange={(e) => setPercentage(e.target.value)}
        className={inputClass}
      />

      <input
        type="number"
        placeholder="Passing Year"
        value={passingYear}
        onChange={(e) => setPassingYear(e.target.value)}
        className={inputClass}
      />
    </div>
  </div>
)}

{category === "New Selection" && (
  <div className="bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-5 mt-4">
    <h3 className="font-bold text-indigo-800 mb-4">
      💼 नव चयन विवरण
    </h3>

    <div className="grid md:grid-cols-2 gap-4">
      <input
        type="text"
        placeholder="विभाग (Department)"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        className={inputClass}
      />

      <input
        type="text"
        placeholder="पद (Post)"
        value={post}
        onChange={(e) => setPost(e.target.value)}
        className={inputClass}
      />
    </div>
  </div>
)}
{category === "Sports" && (
  <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-5 mt-4">
    <h3 className="font-bold text-orange-800 mb-4">
      🏅 खेल उपलब्धि
    </h3>

    <div className="grid md:grid-cols-2 gap-4">

      <select
        value={sportsLevel}
        onChange={(e) => setSportsLevel(e.target.value)}
        className={inputClass}
      >
        <option value="">स्तर चुनें</option>
        <option value="District">जिला</option>
        <option value="State">राज्य</option>
        <option value="National">राष्ट्रीय</option>
      </select>

      <input
        type="text"
        placeholder="खेल का नाम"
        value={gameName}
        onChange={(e) => setGameName(e.target.value)}
        className={inputClass}
      />

    </div>
  </div>
)}

{category === "Promotion" && (
  <div className="bg-cyan-50 border-2 border-cyan-200 rounded-2xl p-5 mt-4">
    <h3 className="font-bold text-cyan-800 mb-4">
      📈 पदोन्नति विवरण
    </h3>

    <div className="grid md:grid-cols-2 gap-4">
      <input
        type="text"
        placeholder="वर्तमान विभाग"
        value={currentDepartment}
        onChange={(e) => setCurrentDepartment(e.target.value)}
        className={inputClass}
      />

      <input
        type="text"
        placeholder="वर्तमान पद"
        value={currentPost}
        onChange={(e) => setCurrentPost(e.target.value)}
        className={inputClass}
      />

      <input
        type="text"
        placeholder="नया पद"
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        className={inputClass}
      />
    </div>
  </div>
)}

{category === "Retirement" && (
  <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-5 mt-4">
    <h3 className="font-bold text-red-800 mb-4">
      🎖️ सेवानिवृत्ति विवरण
    </h3>

    <div className="grid md:grid-cols-2 gap-4">
      <input
        type="text"
        placeholder="विभाग"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        className={inputClass}
      />

      <input
        type="text"
        placeholder="अंतिम पद"
        value={post}
        onChange={(e) => setPost(e.target.value)}
        className={inputClass}
      />

      <input
        type="number"
        placeholder="सेवानिवृत्ति वर्ष"
        value={retirementYear}
        onChange={(e) => setRetirementYear(e.target.value)}
        className={inputClass}
      />
    </div>
  </div>
)}

{/* Other */}
{category === "Other" && (
  <textarea
    placeholder="अपनी उपलब्धि का विवरण लिखें"
    value={otherDetails}
    onChange={(e) => setOtherDetails(e.target.value)}
    className="w-full p-3 rounded-xl"
    rows={4}
  />
)}
<div className="mt-6 bg-blue-50 p-4 rounded-xl border">
  <label className="block font-bold text-blue-800 mb-2">
    📷 Passport Size Photo (Optional)
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) =>
      setPhoto(e.target.files?.[0] || null)
    }
  />
</div>
<div className="mt-4 bg-yellow-50 p-4 rounded-xl border">
  <label className="block font-bold text-yellow-800 mb-2">

    {category === "Sports"
      ? "🏅 Sports Certificate Upload *"
      : category === "10th" ||
        category === "12th" ||
        category === "Graduation"
      ? "📄 Marksheet Upload *"
      : "📄 Supporting Document"}

  </label>

  <input
    type="file"
    accept=".pdf,image/*"
    onChange={(e) =>
      setMarksheet(e.target.files?.[0] || null)
    }
  />
</div>
        <button
  onClick={submitForm}
  disabled={loading}
  className="w-full mt-8 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 rounded-2xl shadow-xl transition"
>
  {loading
    ? "⏳ आवेदन जमा हो रहा है..."
    : "🚀 प्रतिभा सम्मान हेतु आवेदन करें"}
</button>

        {message && (
          <div className="mt-4 text-center text-white">
            {message}
          </div>
        )}

      </div>

    </main>
  );
}