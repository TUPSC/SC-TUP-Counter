import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {

  const body = await req.json();

  const party = body.party;

  // get current score
  const { data } = await supabase
    .from("team")
    .select("*")
    .eq("name", party)
    .single();

  if (!data) {
    return Response.json({
      error: "Party not found"
    });
  }

  // increment
  await supabase
    .from("team")
    .update({
      score: data.score + 1
    })
    .eq("name", party);

  return Response.json({
    success: true
  });

}