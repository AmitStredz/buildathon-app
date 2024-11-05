export const idlFactory = ({ IDL }) => {
  const UserDateRecord = IDL.Record({
    'owner' : IDL.Principal,
    'date' : IDL.Int64,
    'ccids' : IDL.Vec(IDL.Text),
  });
  const DateRecord = IDL.Record({
    'date' : IDL.Int64,
    'ccids' : IDL.Vec(IDL.Text),
  });
  return IDL.Service({
    'add_hash' : IDL.Func([IDL.Text], [IDL.Text], []),
    'format_date' : IDL.Func([IDL.Int64], [IDL.Text], ['query']),
    'get_all_data' : IDL.Func([], [IDL.Vec(UserDateRecord)], ['query']),
    'get_date_data' : IDL.Func([IDL.Int64], [IDL.Opt(DateRecord)], ['query']),
    'get_user_principal' : IDL.Func([], [IDL.Principal], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
