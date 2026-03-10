"use client";
import { useState } from "react";

export default function Form() {
  
  const [formData, setFormData] = useState({
    name: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setErrorMessage("Name is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSubmitStatus(null);
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name.trim());
      
      const response = await fetch("/api", {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
        });
      } else {
        setSubmitStatus("Error");
        setErrorMessage(result.error || "Something went wrong");
      }
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage("Network error");
      console.error("Error  submitting:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-bold text-gray-700">Name</label>
        <input type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full py-1 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none trasition text-gray-900"
          placeholder="Name"
          disabled={isSubmitting}
          required
        />
      </div>
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {errorMessage}
        </div>
      )}
      {submitStatus === 'success' && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                ✓ Success.
              </div>
            )}
      <div className="flex justify-center mt-5">
        <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
        > {isSubmitting ? 'Sending...' : 'Send'} </button>
      </div>
    </form>
  );
}
