import mongoose from "mongoose";

export interface IRole {
    name: string;
    permissions: string[];
}