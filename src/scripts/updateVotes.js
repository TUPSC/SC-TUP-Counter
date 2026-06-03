const XLSX = require("xlsx");

const fs = require("fs");

const path = require("path");

const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://wbdcbmrathhgwsvfdnpy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndiZGNibXJhdGhoZ3dzdmZkbnB5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTg0NjQzNCwiZXhwIjoyMDk1NDIyNDM0fQ.39KbwTJMcexwJVTZfmuXKtq20sDy4e0hsJ-Q-c3vYj4"
);

const folderPath =
  "/Users/leoneena/Desktop/ElectionFiles";

const files = fs.readdirSync(folderPath);

const counts = {
  "พรรคพิง": 0,
  "พรรคมาซบพี่": 0,
  "พรรคพักใจ": 0,
  "พรรคข้างกัน": 0,
  "พรรค(พัก)ข้างเธอ": 0,
  "ไม่ประสงค์ลงคะแนน": 0,
};

files.forEach((file) => {

  if (!file.endsWith(".xlsx")) return;

  const workbook = XLSX.readFile(
    path.join(folderPath, file)
  );

  const sheetName = workbook.SheetNames[0];

  const sheet = workbook.Sheets[sheetName];

  const data = XLSX.utils.sheet_to_json(sheet);

  data.forEach((row) => {

    const vote =
      row["พรรคผู้สมัครรับเลือกตั้งเป็นประธานนักเรียน"];

  console.log(vote);

if (counts[vote] !== undefined) {
  counts[vote]++;
}

  });

});

async function updateVotes() {

  for (const party in counts) {

    await supabase
      .from("team")
      .update({
        score: counts[party]
      })
      .eq("name", party);

  }

  console.log("🔥 ALL FILES MERGED");

  console.log(counts);

}

