import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide Job title"],
    minLength: [3, "Job title should have at least 3 characters"],
    maxLength: [40, "Job title should not exceed 40 characters"],
  },
  description: {
    type: String,
    required: [true, "Please provide Job Description"],
    minLength: [3, "Job description should have at least 3 characters"],
    maxLength: [100000, "Job description should not exceed 350 characters"],
  },
  category: {
    type: String,
    required: [true, "Job category is required"],
  },
  country: {
    type: String,
    required: [true, "Job country is required"],
  },
  city: {
    type: String,
    required: [true, "Job city is required"],
  },
  location: {
    type: String,
    required: [true, "Please provide exact location"],
    minLength: [10, "Job location should have at least 10 characters"],
  },
  fixedSalary: {
    type: Number,
    min: [1000, "Fixed salary must be at least 1000"],
    max: [999999999, "Fixed salary cannot exceed 999999999"],
  },
  salaryFrom: {
    type: Number,
    min: [1000, "Salary from must be at least 1000"],
    max: [999999999, "Salary from cannot exceed 999999999"],
  },
  salaryTo: {
    type: Number,
    min: [1000, "Salary to must be at least 1000"],
    max: [999999999, "Salary to cannot exceed 999999999"],
  },
  expired: {
    type: Boolean,
    default: false,
  },
  jobPostedOn: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Job = mongoose.model("Job", jobSchema);

export  {Job}
