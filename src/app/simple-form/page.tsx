"use client";

import React from "react";
import { create } from "./action";

export default function SimpleFormPage() {
  return (
    <form action={create}>
      <input type="text" name="name" placeholder="What is your name?" />
      <button>Submit</button>
    </form>
  );
}
