import { create } from "zustand";
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
        } catch (error) {
            console.log("Error in checkAuth: ", error.message);
            set({ authUser: null });
        }
        finally {
            set({ isCheckingAuth: false });
        }
    },

    signUp: async (data) => {
        set({isSigningUp:true});
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({authUser: res.data})

            toast.success("Fuioh Account created successfully!")
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error)
        }
        finally{
            set({isSigningUp:false})
        }
    },

    login: async (data) => {
        try {
            const res= await axiosInstance.post("/auth/login",data);
            set({authUser: res.data})
            toast.success("Fuioh Logged In successfully!")
        } catch (error) {
            
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser:null});
            toast.success("Fuioh Logged out successfully! Nice")
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    updateProfile: async (data) => {
        set({isUpdatingProfile:true});
        try {
            const res= await axiosInstance.put("/auth/update-profile",data)
            set({authUser:res.data})
            toast.success("Profile Updated Successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        }
        finally{
            set({isUpdatingProfile:false})
        }
    }
}));