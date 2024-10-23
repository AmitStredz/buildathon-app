// export const idlFactory = ({ IDL }) => {
//   return IDL.Service({
//     add: IDL.Func([IDL.Text], [IDL.Text], ["query"]),
//     get: IDL.Func([IDL.Text], [IDL.Opt(IDL.Text)], ["query"]),
//     update: IDL.Func([IDL.Int, IDL.Text], [IDL.Bool], []),
//     remove: IDL.Func([IDL.Int], [IDL.Bool], []),
//   });
// };


export const idlFactory = ({ IDL }) => {
  const DateData = IDL.Record({
    date: IDL.Int64,
    ccids: IDL.Vec(IDL.Text),
  });

  return IDL.Service({
    add: IDL.Func([IDL.Text], [IDL.Text], ["query"]),
    get: IDL.Func([IDL.Text], [IDL.Opt(IDL.Text)], ["query"]),
    update: IDL.Func([IDL.Int, IDL.Text], [IDL.Bool], []),
    remove: IDL.Func([IDL.Int], [IDL.Bool], []),
    add_hash: IDL.Func([IDL.Text], [IDL.Text], []),
    get_date_data: IDL.Func([IDL.Int64], [IDL.Opt(DateData)], ["query"]),
    get_all_data: IDL.Func([], [IDL.Vec(DateData)], ["query"]),
    format_date: IDL.Func([IDL.Int64], [IDL.Text], ["query"]),
  });
};
