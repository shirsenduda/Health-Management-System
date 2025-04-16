import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AdminContext } from "../../Context/AdminContext";
// import { assets } from "../assets/assets_admin/assets";
// import { assets } from "";

import axios from "axios";
// import { assets } from "../../../public/assets/assets_frontend/assets";

const AddDoctor = () => {
  const [profileImage, setProfileImage] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);

  console.log(aToken);

  // const submitHandler = async (e) => {
  //   e.preventDefault();
  //   try {
  //     console.log("Submitting form...");

  //     if (!profileImage) {
  //       return toast.error("Image not selected");
  //     }
  //     const formData = new FormData()

  //     formData.append('image',profileImage)
  //     formData.append('name',name)
  //     formData.append('email',email)
  //     formData.append('password',password)
  //     formData.append('experience',experience)
  //     formData.append('fees', Number( fees))
  //     formData.append('about', about)
  //     formData.append('speciality', speciality)
  //     formData.append('degree', degree)
  //     formData.append('address',JSON.stringify({line1:address1,line2:address2}))

  //     formData.forEach((v,k)=>{
  //       console.log(`${k} : ${v}`);

  //     })
  //     const {data} = await axios.post(`${backendUrl}/api/admin/add-doctor`, formData, {
  //       headers: {
  //         Authorization: `Bearer ${aToken}`,
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });

  //     if(data.success){
  //       toast.success(data.message)
  //     }else{
  //       toast.error(data.message)
  //     }

  //     // toast.success("Form submitted successfully!");
  //   } catch (error) {
  //     console.error("Error:", error);
  //     toast.error("Something went wrong!");
  //   }
  // };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!profileImage) {
        return toast.error("Image not selected");
      }
      const formData = new FormData();
      formData.append("image", profileImage);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );
      // Debugging the form data
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { aToken } }
      );
      console.log(data);

      if (data.success) {
        toast.success(data.message);
        setProfileImage(false);
        setName("");
        setPassword("");
        setEmail("");
        setAddress1("");
        setAddress2("");
        setDegree("");
        setAbout("");
        setFees("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto mt-10 max-h-[80vh] overflow-y-scroll">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Add Doctor
      </h2>

      <form onSubmit={submitHandler}>
        {" "}
        {/* ✅ Fix: Wrap in <form> */}
        {/* Profile Picture Upload */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-gray-300">
            <img
              className="w-16 rounded-full"
              src={
                profileImage ? (
                  URL.createObjectURL(profileImage)
                ) : (
                  <img src="/assets/assets_frontend/upload_icon.png" alt="" />
                )
              }
              alt="Doctor"
            />
          </div>
          <label className="mt-3 cursor-pointer bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
            Upload Photo
            <input
              type="file"
              className="hidden"
              onChange={(e) => setProfileImage(e.target.files[0])}
            />
          </label>
        </div>
        {/* Doctor Details */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Doctor Name
            </label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="mt-2 block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Speciality
            </label>
            <select
              onChange={(e) => setSpeciality(e.target.value)}
              value={speciality}
              className="mt-2 block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option>General Physician</option>
              <option>Gynecologist</option>
              <option>Dermatologist</option>
              <option>Pediatrician</option>
              <option>Neurologist</option>
            </select>
          </div>
        </div>
        {/* Email & Education */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Doctor Email
            </label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="mt-2 block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Education
            </label>
            <input
              type="text"
              onChange={(e) => setDegree(e.target.value)}
              value={degree}
              className="mt-2 block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        {/* Password & Address */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Doctor Password
            </label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="mt-2 block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              placeholder="Address Line 1"
              onChange={(e) => setAddress1(e.target.value)}
              value={address1}
              className="mt-2 block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Address Line 2"
              onChange={(e) => setAddress2(e.target.value)}
              value={address2}
              className="mt-2 block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        {/* Experience & Fees */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Experience
            </label>
            <select
              onChange={(e) => setExperience(e.target.value)}
              value={experience}
              className="mt-2 block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="1 Year">1 Year</option>
              <option value="2 Years">2 Years</option>
              <option value="3 Years">3 Years</option>
              <option value="4 Years">4 Years</option>
              <option value="5 Years">5 Years</option>
              <option value="More than 5 Years">More than 5 Years</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fees
            </label>
            <input
              type="text"
              onChange={(e) => setFees(e.target.value)}
              value={fees}
              className="mt-2 block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        {/* About Me */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            About me
          </label>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            rows={4}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Write about yourself"
          />
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Add Doctor
        </button>
      </form>
    </div>
  );
};

export default AddDoctor;
