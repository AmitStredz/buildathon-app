export const idlFactory = ({ IDL }) => {
  const DateData = IDL.Record({
    'date' : IDL.Int64,
    'ccids' : IDL.Vec(IDL.Nat32),
  });
  return IDL.Service({
    'add' : IDL.Func([IDL.Text], [IDL.Nat32], []),
    'format_date' : IDL.Func([IDL.Int64], [IDL.Text], ['query']),
    'get_all_data' : IDL.Func([], [IDL.Vec(DateData)], ['query']),
    'get_date_data' : IDL.Func([IDL.Int64], [IDL.Opt(DateData)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
