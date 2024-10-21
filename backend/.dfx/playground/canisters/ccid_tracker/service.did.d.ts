import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface DateData { 'date' : bigint, 'ccids' : Uint32Array | number[] }
export interface _SERVICE {
  'add' : ActorMethod<[string], number>,
  'format_date' : ActorMethod<[bigint], string>,
  'get_all_data' : ActorMethod<[], Array<DateData>>,
  'get_date_data' : ActorMethod<[bigint], [] | [DateData]>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
