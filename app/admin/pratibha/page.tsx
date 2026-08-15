"use client";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function AdminPratibhaPage() {
  const [registrationStatus, setRegistrationStatus] =
  useState("open");

const [closeMessage, setCloseMessage] =
  useState("");
 
  const downloadExcel = () => {

  const worksheet = XLSX.utils.json_to_sheet(applications);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Pratibha Applications"
  );

  XLSX.writeFile(
    workbook,
    "Pratibha_Applications.xlsx"
  );
};
const downloadPDF = () => {

  const doc = new jsPDF();

  doc.setFontSize(16);

  doc.text(
    "Pratibha Samman Applications",
    14,
    15
  );

  autoTable(doc, {
    startY: 25,

    head: [[
      "ID",
      "Name",
      "Village",
      "Mobile",
      "Category",
      "Percentage",
      "Status"
    ]],

    body: applications.map((item) => [
      item.id,
      item.student_name,
      item.village,
      item.mobile,
      item.category,
      item.percentage,
      item.status
    ])
  });

  doc.save("Pratibha_Applications.pdf");
};
  const [applications, setApplications] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [rules, setRules] = useState<any[]>([]);
const [categories, setCategories] = useState<any[]>([]);

const [newRule, setNewRule] = useState("");
const [newCategory, setNewCategory] = useState("");

 useEffect(() => {
  loadApplications();
  loadSettings();
  loadWebsiteSettings();
}, []);

  async function loadApplications() {
    const { data } = await supabase
      .from("pratibha")
      .select("*")
      .order("id", { ascending: false });

    if (data) {
      setApplications(data);
    }
  }

  async function loadWebsiteSettings() {
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
  const { data } = await supabase
    .from("pratibha_settings")
    .select("*");

  if (!data) return;

  setRules(
    data.filter(
      (x) => x.setting_type === "rule"
    )
  );

  setCategories(
    data.filter(
      (x) => x.setting_type === "category"
    )
  );
}

  async function updateStatus(id: number, status: string) {

  if (status === "Approved") {

    await supabase
      .from("pratibha")
      .update({
        status: "Approved",
        approval_date: new Date().toISOString()
      })
      .eq("id", id);

  } else {

    await supabase
      .from("pratibha")
      .update({
        status: "Rejected"
      })
      .eq("id", id);

  }

  loadApplications();
}

async function deleteApplication(
  id: number,
  studentName: string
) {
  const confirmed = window.confirm(
    `क्या आप "${studentName}" की प्रतिभा सम्मान application delete करना चाहते हैं?\n\nयह record permanently delete हो जाएगा।`
  );

  if (!confirmed) return;

  const { error } = await supabase
    .from("pratibha")
    .delete()
    .eq("id", id);

  if (error) {
    alert("Delete failed: " + error.message);
    return;
  }

  alert("Pratibha application successfully deleted.");

  loadApplications();
}

async function addRule() {

  if (!newRule.trim()) return;

  await supabase
    .from("pratibha_settings")
    .insert([
      {
        setting_type: "rule",
        value: newRule,
      },
    ]);

  setNewRule("");
  loadSettings();
}
async function deleteRule(id: number) {

  await supabase
    .from("pratibha_settings")
    .delete()
    .eq("id", id);

  loadSettings();
}
async function addCategory() {

  if (!newCategory.trim()) return;

  await supabase
    .from("pratibha_settings")
    .insert([
      {
        setting_type: "category",
        value: newCategory,
      },
    ]);

  setNewCategory("");
  loadSettings();
}
async function deleteCategory(id: number) {

  await supabase
    .from("pratibha_settings")
    .delete()
    .eq("id", id);

  loadSettings();
}
async function savePratibhaSettings() {

  await supabase
    .from("website_settings")
    .upsert({
      setting_key: "pratibha_registration",
      setting_value: registrationStatus,
    });

  await supabase
    .from("website_settings")
    .upsert({
      setting_key: "pratibha_message",
      setting_value: closeMessage,
    });

  alert("Settings Saved Successfully");
}

async function saveCloseMessage() {

  await supabase
    .from("website_settings")
    .upsert({
      setting_key: "pratibha_message",
      setting_value: closeMessage,
    });

  alert("Message Saved");
}

async function toggleHome(id: number, current: boolean) {

  await supabase
    .from("pratibha")
    .update({
      show_home: !current,
    })
    .eq("id", id);

  loadApplications();
}
  const filteredData = applications.filter(
    (item) =>
      item.student_name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      item.mobile?.includes(search)
  );

  return (
  <main className="min-h-screen p-6">

    {/* Registration Control */}
    <div className="bg-white rounded-3xl p-6 mb-6">

      <h2 className="text-2xl font-bold mb-4">
        🔒 Registration Control
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        <div>
          <label className="font-semibold">
            Registration Status
          </label>

          <select
            value={registrationStatus}
            onChange={(e) =>
              setRegistrationStatus(e.target.value)
            }
            className="w-full border p-3 rounded-xl mt-2"
          >
            <option value="open">
              🟢 Open Registration
            </option>

            <option value="closed">
              🔴 Close Registration
            </option>
          </select>
        </div>

        <div>
          <label className="font-semibold">
            Close Message
          </label>

          <textarea
            rows={3}
            value={closeMessage}
            onChange={(e) =>
              setCloseMessage(e.target.value)
            }
            className="w-full border p-3 rounded-xl mt-2"
            placeholder="Application Close Message"
          />
        </div>

      </div>

      <button
        onClick={savePratibhaSettings}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl mt-4"
      >
        💾 Save Settings
      </button>

    </div>

    {/* Page Heading */}
    <h1 className="text-4xl font-bold text-yellow-300 mb-6">
      🏆 Pratibha Samman Applications
    </h1>

    <div className="flex gap-4 mb-6">

      <button
        onClick={downloadExcel}
        className="bg-green-600 text-white px-5 py-2 rounded-xl"
      >
        📊 Download Excel
      </button>

      <button
        onClick={downloadPDF}
        className="bg-red-600 text-white px-5 py-2 rounded-xl"
      >
        📄 Download PDF
      </button>

    </div>

    <input
      type="text"
      placeholder="नाम या मोबाइल से खोजें"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full p-3 rounded-xl mb-6"
    />

    <div className="overflow-auto bg-white rounded-3xl p-4">

      <table className="w-full border-collapse">

        <thead>
          <tr className="bg-yellow-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">नाम</th>
            <th className="border p-2">पिता</th>
            <th className="border p-2">ग्राम</th>
            <th className="border p-2">मोबाइल</th>
            <th className="border p-2">श्रेणी</th>
            <th className="border p-2">%</th>
            <th className="border p-2">फोटो</th>
            <th className="border p-2">मार्कशीट</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Home Page</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              {/* तुम्हारा existing row code यहीं रहेगा */}
            </tr>
          ))}
        </tbody>

      </table>

    </div>

    {/* Pratibha Settings Section */}
    <div className="mt-10 bg-white rounded-3xl p-6">

      <h2 className="text-2xl font-bold mb-6">
        ⚙️ Pratibha Settings
      </h2>

      <div className="grid md:grid-cols-2 gap-8">

        {/* Categories */}

        {/* Rules */}

      </div>

    </div>

    {/* Pratibha Settings */}

<div className="mt-10 bg-white rounded-3xl p-6">

  <h2 className="text-2xl font-bold mb-6">
    ⚙️ Pratibha Settings
  </h2>
  

  <div className="grid md:grid-cols-2 gap-8">

    {/* Categories */}

    <div>

      <h3 className="text-xl font-bold mb-4">
        📂 Categories
      </h3>

      <div className="flex gap-2 mb-4">

        <input
          type="text"
          value={newCategory}
          onChange={(e) =>
            setNewCategory(e.target.value)
          }
          placeholder="New Category"
          className="border p-3 rounded-xl flex-1"
        />

        <button
          onClick={addCategory}
          className="bg-green-600 text-white px-4 rounded-xl"
        >
          Add
        </button>

      </div>

      {categories.map((item) => (

        <div
          key={item.id}
          className="flex justify-between items-center bg-gray-100 p-3 rounded-xl mb-2"
        >

          <span>{item.value}</span>

          <button
            onClick={() =>
              deleteCategory(item.id)
            }
            className="bg-red-600 text-white px-3 py-1 rounded"
          >
            Delete
          </button>

        </div>

      ))}

    </div>

    {/* Rules */}

    <div>

      <h3 className="text-xl font-bold mb-4">
        📜 Rules
      </h3>

      <div className="flex gap-2 mb-4">

        <input
          type="text"
          value={newRule}
          onChange={(e) =>
            setNewRule(e.target.value)
          }
          placeholder="New Rule"
          className="border p-3 rounded-xl flex-1"
        />

        <button
          onClick={addRule}
          className="bg-green-600 text-white px-4 rounded-xl"
        >
          Add
        </button>

      </div>

      {rules.map((item) => (

        <div
          key={item.id}
          className="flex justify-between items-center bg-gray-100 p-3 rounded-xl mb-2"
        >

          <span>{item.value}</span>

          <button
            onClick={() =>
              deleteRule(item.id)
            }
            className="bg-red-600 text-white px-3 py-1 rounded"
          >
            Delete
          </button>

        </div>

      ))}

    </div>

  

</div>
      </div>

    </main>
  );
}