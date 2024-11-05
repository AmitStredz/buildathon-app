import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface DateRecord { 'date' : bigint, 'ccids' : Array<string> }
export interface UserDateRecord {
  'owner' : Principal,
  'date' : bigint,
  'ccids' : Array<string>,
}
export interface _SERVICE {
  'add_hash' : ActorMethod<[string], string>,
  'format_date' : ActorMethod<[bigint], string>,
  'get_all_data' : ActorMethod<[], Array<UserDateRecord>>,
  'get_date_data' : ActorMethod<[bigint], [] | [DateRecord]>,
  'get_user_principal' : ActorMethod<[], Principal>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
