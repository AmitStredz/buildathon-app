export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    add: IDL.Func([IDL.Text], [IDL.Text], ["query"]),
    get: IDL.Func([IDL.Text], [IDL.Opt(IDL.Text)], ["query"]),
    update: IDL.Func([IDL.Int, IDL.Text], [IDL.Bool], []),
    remove: IDL.Func([IDL.Int], [IDL.Bool], []),
  });
};
