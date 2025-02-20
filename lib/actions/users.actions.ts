'use server'
import { revalidatePath } from "next/cache"
import User from "../database/models/user.model"
import { handleError } from "../utils"
import { connectionTODb } from "../database/mongoose"

//Create
export async function createUser(user:CreateUserParams) {
    try{
        await connectionTODb();
        const newUser = await User.create(user);

        return JSON.parse(JSON.stringify(newUser));
    }catch(error){
        handleError(error);
    }
}

//Read

export async function getUserById(userId : string) {
    try {
        await connectionTODb();
        const reqUser = await User.findOne({clerkId:userId});

        if(!reqUser) throw new Error('User Not Found');
        return  JSON.parse(JSON.stringify(reqUser));
    } catch (error) {
        handleError(error);
    }
}

//Update 

export async function updateUser(clerkId:string,user:UpdateUserParams) {
    try {
        await connectionTODb();
        const updatedUser  = await User.findOneAndUpdate({clerkId},User,{new:true})
        if(!updateUser) throw new Error("User Update Failed");
        return  JSON.parse(JSON.stringify(updatedUser));
    } catch (error) {
        handleError(error);
    }
}

// DELETE
export async function deleteUser(clerkId: string) {
    try {
      await connectionTODb();
  
      // Find user to delete
      const userToDelete = await User.findOne({ clerkId });
  
      if (!userToDelete) {
        throw new Error("User not found");
      }
  
      // Delete user
      const deletedUser = await User.findByIdAndDelete(userToDelete._id);
      revalidatePath("/");
  
      return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
    } catch (error) {
      handleError(error);
    }
  }

  // USE CREDITS
export async function updateCredits(userId: string, creditFee: number) {
    try {
      await connectionTODb();
  
      const updatedUserCredits = await User.findOneAndUpdate(
        { _id: userId },
        { $inc: { creditBalance: creditFee }},
        { new: true }
      )
  
      if(!updatedUserCredits) throw new Error("User credits update failed");
  
      return JSON.parse(JSON.stringify(updatedUserCredits));
    } catch (error) {
      handleError(error);
    }
  }