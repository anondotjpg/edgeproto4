import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { privyServer } from "@/lib/privy-server";

type RenameAccountBody = {
  accountId?: string;
  accountName?: string;
};

const MAX_ACCOUNT_NAME_LENGTH = 15;

function cleanAccountName(value: string) {
  return value.trim().replace(/\s+/g, " ").slice(0, MAX_ACCOUNT_NAME_LENGTH);
}

export async function PATCH(req: Request) {
  try {
    const headerStore = await headers();
    const authHeader = headerStore.get("authorization");
    const accessToken = authHeader?.replace("Bearer ", "");

    if (!accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const verifiedClaims = await privyServer
      .utils()
      .auth()
      .verifyAuthToken(accessToken);

    const privyUserId = verifiedClaims.user_id;

    if (!privyUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await req.json()) as RenameAccountBody;

    if (!body.accountId) {
      return NextResponse.json(
        { error: "Missing account ID." },
        { status: 400 }
      );
    }

    const cleanedName =
      typeof body.accountName === "string"
        ? cleanAccountName(body.accountName)
        : "";

    const accountName = cleanedName.length ? cleanedName : null;

    const { data: dbUser, error: userError } = await supabaseAdmin
      .from("users")
      .select("id")
      .eq("privy_user_id", privyUserId)
      .maybeSingle();

    if (userError) throw userError;

    if (!dbUser) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const { data: account, error: updateError } = await supabaseAdmin
      .from("challenge_accounts")
      .update({
        account_name: accountName,
      })
      .eq("id", body.accountId)
      .eq("user_id", dbUser.id)
      .select(
        `
        id,
        account_name,
        plan_key,
        plan_size,
        one_time_fee,
        status,
        starting_balance,
        current_balance,
        reserved_risk,
        realized_pnl,
        profit_target_percent,
        daily_drawdown_percent,
        total_drawdown_percent,
        max_risk_amount,
        daily_loss_limit_amount,
        total_loss_limit_amount,
        passed_at,
        failed_at,
        failure_reason,
        created_at
      `
      )
      .maybeSingle();

    if (updateError) throw updateError;

    if (!account) {
      return NextResponse.json(
        { error: "Account not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ok: true,
      account,
    });
  } catch (error) {
    console.error("Rename account error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to rename account.",
      },
      { status: 500 }
    );
  }
}