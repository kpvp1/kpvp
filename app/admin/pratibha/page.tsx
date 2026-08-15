"use client";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function AdminPratibhaPage() {
  const [registrationStatus, setRegistrationStatus] = useState("open");
  const [closeMessage, setCloseMessage] = useState("");

  const [applications, setApplications] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const [rules, setRules] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  const [newRule, setNewRule] = useState("");
  const [newCategory, setNewCategory] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadApplications();
    loadWebsiteSettings();
    loadSettings();
  }, []);

  // =========================
  // LOAD APPLICATIONS
  // =========================

  async function loadApplications() {
    const { data, error } = await supabase
      .from("pratibha")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error("Applications Error:", error);
      alert("Applications load नहीं हो पाए: " + error.message);
      return;
    }

    setApplications(data || []);
  }

  // =========================
  // LOAD WEBSITE SETTINGS
  // =========================

  async function loadWebsiteSettings() {
    const { data, error } = await supabase
      .from("website_settings")
      .select("*");

    if (error) {
      console.error("Website Settings Error:", error);
      return;
    }

    const status = data?.find(
      (x) => x.setting_key === "pratibha_registration"
    );

    const message = data?.find(
      (x) => x.setting_key === "pratibha_message"
    );

    if (status) {
      setRegistrationStatus(status.setting_value);
    }

    if (message) {
      setCloseMessage(message.setting_value);
    }
  }

  // =========================
  // SAVE WEBSITE SETTING
  // =========================

  async function saveWebsiteSetting(
    key: string,
    value: string
  ) {
    const { data: existing, error: findError } = await supabase
      .from("website_settings")
      .select("id")
      .eq("setting_key", key)
      .limit(1);

    if (findError) {
      throw findError;
    }

    if (existing && existing.length > 0) {
      const { error } = await supabase
        .from("website_settings")
        .update({
          setting_value: value,
        })
        .eq("id", existing[0].id);

      if (error) throw error;
    } else {
      const { error } = await supabase
        .from("website_settings")
        .insert([
          {
            setting_key: key,
            setting_value: value,
          },
        ]);

      if (error) throw error;
    }
  }

  // =========================
  // SAVE OPEN / CLOSE
  // =========================

  async function savePratibhaSettings() {
    try {
      setLoading(true);

      await saveWebsiteSetting(
        "pratibha_registration",
        registrationStatus
      );

      await saveWebsiteSetting(
        "pratibha_message",
        closeMessage
      );

      await loadWebsiteSettings();

      alert(
        registrationStatus === "open"
          ? "✅ Pratibha Registration OPEN कर दिया गया है।"
          : "🔴 Pratibha Registration CLOSE कर दिया गया है।"
      );
    } catch (error: any) {
      console.error(error);
      alert("❌ Settings Save Error: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  // =========================
  // LOAD PRATIBHA SETTINGS
  // =========================

  async function loadSettings() {
    const { data, error } = await supabase
      .from("pratibha_settings")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Pratibha Settings Error:", error);
      return;
    }

    setRules(
      (data || []).filter(
        (x) => x.setting_type === "rule"
      )
    );

    setCategories(
      (data || []).filter(
        (x) => x.setting_type === "category"
      )
    );
  }

  // =========================
  // APPROVE / REJECT
  // =========================

  async function updateStatus(
    id: number,
    status: string
  ) {
    const updateData: any = {
      status,
    };

    if (status === "Approved") {
      updateData.approval_date =
        new Date().toISOString();
    }

    const { error } = await supabase
      .from("pratibha")
      .update(updateData)
      .eq("id", id);

    if (error) {
      alert("Status update failed: " + error.message);
      return;
    }

    await loadApplications();
  }

  // =========================
  // DELETE APPLICATION
  // =========================

  async function deleteApplication(
    id: number,
    studentName: string
  ) {
    const confirmed = window.confirm(
      `क्या आप "${studentName}" की Pratibha application delete करना चाहते हैं?\n\nयह record permanently delete हो जाएगा।`
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

    alert("✅ Pratibha application successfully deleted.");

    await loadApplications();
  }

  // =========================
  // HOME PAGE TOGGLE
  // =========================

  async function toggleHome(
    id: number,
    current: boolean
  ) {
    const { error } = await supabase
      .from("pratibha")
      .update({
        show_home: !current,
      })
      .eq("id", id);

    if (error) {
      alert("Home Page update failed: " + error.message);
      return;
    }

    await loadApplications();
  }

  // =========================
  // ADD RULE
  // =========================

  async function addRule() {
    if (!newRule.trim()) return;

    const { error } = await supabase
      .from("pratibha_settings")
      .insert([
        {
          setting_type: "rule",
          value: newRule.trim(),
        },
      ]);

    if (error) {
      alert("Rule add failed: " + error.message);
      return;
    }

    setNewRule("");
    await loadSettings();
  }

  // =========================
  // DELETE RULE
  // =========================

  async function deleteRule(id: number) {
    const { error } = await supabase
      .from("pratibha_settings")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Rule delete failed: " + error.message);
      return;
    }

    await loadSettings();
  }

  // =========================
  // ADD CATEGORY
  // =========================

  async function addCategory() {
    if (!newCategory.trim()) return;

    const { error } = await supabase
      .from("pratibha_settings")
      .insert([
        {
          setting_type: "category",
          value: newCategory.trim(),
        },
      ]);

    if (error) {
      alert("Category add failed: " + error.message);
      return;
    }

    setNewCategory("");
    await loadSettings();
  }

  // =========================
  // DELETE CATEGORY
  // =========================

  async function deleteCategory(id: number) {
    const { error } = await supabase
      .from("pratibha_settings")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Category delete failed: " + error.message);
      return;
    }

    await loadSettings();
  }

  // =========================
  // EXCEL
  // =========================

  function downloadExcel() {
    const worksheet =
      XLSX.utils.json_to_sheet(applications);

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
  }

  // =========================
  // PDF
  // =========================

  function downloadPDF() {
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
        "Father",
        "Village",
        "Mobile",
        "Category",
        "%",
        "Status",
      ]],

      body: applications.map((item) => [
        item.id,
        item.student_name || "",
        item.father_name || "",
        item.village || "",
        item.mobile || "",
        item.category || "",
        item.percentage || "",
        item.status || "",
      ]),
    });

    doc.save(
      "Pratibha_Applications.pdf"
    );
  }

  // =========================
  // SEARCH
  // =========================

  const filteredData =
    applications.filter((item) => {
      const searchText =
        search.toLowerCase().trim();

      return (
        item.student_name
          ?.toLowerCase()
          .includes(searchText) ||
        item.mobile
          ?.toString()
          .includes(searchText) ||
        item.village
          ?.toLowerCase()
          .includes(searchText) ||
        item.category
          ?.toLowerCase()
          .includes(searchText)
      );
    });

  return (
    <main className="min-h-screen p-6">

      {/* ========================= */}
      {/* REGISTRATION CONTROL */}
      {/* ========================= */}

      <div className="bg-white rounded-3xl p-6 mb-6 shadow-lg">

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
                setRegistrationStatus(
                  e.target.value
                )
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
                setCloseMessage(
                  e.target.value
                )
              }
              className="w-full border p-3 rounded-xl mt-2"
              placeholder="Application Close Message"
            />

          </div>

        </div>

        <button
          onClick={savePratibhaSettings}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl mt-4 font-bold"
        >
          {loading
            ? "Saving..."
            : "💾 Save Settings"}
        </button>

      </div>

      {/* ========================= */}
      {/* HEADING */}
      {/* ========================= */}

      <h1 className="text-4xl font-bold text-yellow-300 mb-6">
        🏆 Pratibha Samman Applications
      </h1>

      {/* ========================= */}
      {/* EXPORT BUTTONS */}
      {/* ========================= */}

      <div className="flex flex-wrap gap-4 mb-6">

        <button
          onClick={downloadExcel}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl"
        >
          📊 Download Excel
        </button>

        <button
          onClick={downloadPDF}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl"
        >
          📄 Download PDF
        </button>

        <button
          onClick={loadApplications}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl"
        >
          🔄 Refresh
        </button>

      </div>

      {/* ========================= */}
      {/* SEARCH */}
      {/* ========================= */}

      <input
        type="text"
        placeholder="नाम, मोबाइल, गाँव या श्रेणी से खोजें"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full p-3 rounded-xl mb-6 text-black"
      />

      {/* ========================= */}
      {/* APPLICATION TABLE */}
      {/* ========================= */}

      <div className="overflow-auto bg-white rounded-3xl p-4 shadow-lg">

        <table className="w-full border-collapse text-sm">

          <thead>

            <tr className="bg-yellow-200">

              <th className="border p-2">
                ID
              </th>

              <th className="border p-2">
                Registration
              </th>

              <th className="border p-2">
                नाम
              </th>

              <th className="border p-2">
                पिता
              </th>

              <th className="border p-2">
                गाँव
              </th>

              <th className="border p-2">
                मोबाइल
              </th>

              <th className="border p-2">
                श्रेणी
              </th>

              <th className="border p-2">
                %
              </th>

              <th className="border p-2">
                फोटो
              </th>

              <th className="border p-2">
                Marksheet
              </th>

              <th className="border p-2">
                Status
              </th>

              <th className="border p-2">
                Home
              </th>

              <th className="border p-2">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredData.length === 0 ? (

              <tr>

                <td
                  colSpan={13}
                  className="text-center p-8 text-gray-500"
                >
                  कोई Pratibha Application नहीं मिली।
                </td>

              </tr>

            ) : (

              filteredData.map((item) => (

                <tr
                  key={item.id}
                  className="hover:bg-gray-50"
                >

                  <td className="border p-2">
                    {item.id}
                  </td>

                  <td className="border p-2 font-semibold">
                    {item.registration_no || "-"}
                  </td>

                  <td className="border p-2 font-semibold">
                    {item.student_name || "-"}
                  </td>

                  <td className="border p-2">
                    {item.father_name || "-"}
                  </td>

                  <td className="border p-2">
                    {item.village || "-"}
                  </td>

                  <td className="border p-2">
                    {item.mobile || "-"}
                  </td>

                  <td className="border p-2">
                    {item.category || "-"}
                  </td>

                  <td className="border p-2">
                    {item.percentage || "-"}
                  </td>

                  <td className="border p-2">

                    {item.photo_url ? (

                      <a
                        href={item.photo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline font-semibold"
                      >
                        View Photo
                      </a>

                    ) : (
                      "-"
                    )}

                  </td>

                  <td className="border p-2">

                    {item.marksheet_url ? (

                      <a
                        href={item.marksheet_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline font-semibold"
                      >
                        View Document
                      </a>

                    ) : (
                      "-"
                    )}

                  </td>

                  <td className="border p-2">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        item.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status || "Pending"}
                    </span>

                  </td>

                  <td className="border p-2">

                    <button
                      onClick={() =>
                        toggleHome(
                          item.id,
                          !!item.show_home
                        )
                      }
                      className={`px-3 py-1 rounded-lg text-white font-bold ${
                        item.show_home
                          ? "bg-green-600"
                          : "bg-gray-500"
                      }`}
                    >
                      {item.show_home
                        ? "Shown"
                        : "Hidden"}
                    </button>

                  </td>

                  <td className="border p-2">

                    <div className="flex flex-col gap-2">

                      {item.status !==
                        "Approved" && (

                        <button
                          onClick={() =>
                            updateStatus(
                              item.id,
                              "Approved"
                            )
                          }
                          className="bg-green-600 text-white px-3 py-1 rounded-lg"
                        >
                          Approve
                        </button>

                      )}

                      {item.status !==
                        "Rejected" && (

                        <button
                          onClick={() =>
                            updateStatus(
                              item.id,
                              "Rejected"
                            )
                          }
                          className="bg-orange-500 text-white px-3 py-1 rounded-lg"
                        >
                          Reject
                        </button>

                      )}

                      <button
                        onClick={() =>
                          deleteApplication(
                            item.id,
                            item.student_name
                          )
                        }
                        className="bg-red-600 text-white px-3 py-1 rounded-lg"
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      {/* ========================= */}
      {/* SETTINGS */}
      {/* ========================= */}

      <div className="mt-10 bg-white rounded-3xl p-6 shadow-lg">

        <h2 className="text-2xl font-bold mb-6">
          ⚙️ Pratibha Settings
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          {/* CATEGORIES */}

          <div>

            <h3 className="text-xl font-bold mb-4">
              📂 Categories
            </h3>

            <div className="flex gap-2 mb-4">

              <input
                type="text"
                value={newCategory}
                onChange={(e) =>
                  setNewCategory(
                    e.target.value
                  )
                }
                placeholder="New Category"
                className="border p-3 rounded-xl flex-1 text-black"
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

                <span className="text-black">
                  {item.value}
                </span>

                <button
                  onClick={() =>
                    deleteCategory(
                      item.id
                    )
                  }
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>

              </div>

            ))}

          </div>

          {/* RULES */}

          <div>

            <h3 className="text-xl font-bold mb-4">
              📜 Rules
            </h3>

            <div className="flex gap-2 mb-4">

              <input
                type="text"
                value={newRule}
                onChange={(e) =>
                  setNewRule(
                    e.target.value
                  )
                }
                placeholder="New Rule"
                className="border p-3 rounded-xl flex-1 text-black"
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

                <span className="text-black">
                  {item.value}
                </span>

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