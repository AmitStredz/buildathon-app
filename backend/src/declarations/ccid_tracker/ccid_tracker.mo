// This is a generated Motoko binding.
// Please use `import service "ic:canister_id"` instead to call canisters on the IC if possible.

module {
  public type DateRecord = { date : Int64; ccids : [Text] };
  public type UserDateRecord = {
    owner : Principal;
    date : Int64;
    ccids : [Text];
  };
  public type Self = actor {
    add_hash : shared Text -> async Text;
    format_date : shared query Int64 -> async Text;
    get_all_data : shared query () -> async [UserDateRecord];
    get_date_data : shared query Int64 -> async ?DateRecord;
    get_user_principal : shared query () -> async Principal;
  }
}
