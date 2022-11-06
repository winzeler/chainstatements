import { model, Schema } from "mongoose";

// interfaces
import { IAddress } from "../interfaces/address.interface";
import { AddressStatus, AddressStatusValues } from '../config/constants';



/**
 * TODO: switch to typescript paper from mongoose
 */
const AddressSchema: Schema = new Schema(
  {
    /** user id */
    user_id: {
      required: false,
      type: String,
    },
    /** optional email */
    email: {
      required: false,
      type: String,
    },
    /** account address */
    address: {
      required: true,
      type: String,
    },
    /** type - etherum | etc */
    chain: {
      required: true,
      default: "ethereum",
      type: String,
    },
    /** blockchain chain from covalent */
    chain_id: {
      required: true,
      type: Number,
    },
    /** optional name */
    name: {
      required: false,
      type: String,
    },
    push: {
      type: Boolean,
      default: false,
    },
    xmtp: {
      type: Boolean,
      default: false,
    },
    /** import status */
    status: {
      default: AddressStatus.pending,
      enum: AddressStatusValues, 
      required: true,
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },

  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

AddressSchema.index(
  { address: 1, email: 1, chain: 1, chain_id: 1 },
  { unique: true } as any,
);

export default model<IAddress>("addresses", AddressSchema);
