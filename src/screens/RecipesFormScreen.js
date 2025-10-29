import { View,Text,TextInput,TouchableOpacity,Image,StyleSheet,} from "react-native";
import React, { useState } from "react";
// import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {widthPercentageToDP as wp,heightPercentageToDP as hp,} from "react-native-responsive-screen";

export default function RecipesFormScreen({ route, navigation }) {
  const {recipeToEdit, recipeIndex, onrecipeEdited } = route.params || {};
  const [recipeName, setRecipeName] = useState(recipeToEdit ? recipeToEdit.recipeName : "");
  const [image, setImage] = useState(recipeToEdit ? recipeToEdit.image : "");
  const [description, setDescription] = useState(
    recipeToEdit ? recipeToEdit.description : ""
  );

  

  const saverecipe = async () => {

    const newRecipe = { recipeName, image, description };
    try 
      {
        const existingRecipes = await AsyncStorage.getItem("customRecipes");
        const recipes = existingRecipes ? JSON.parse(existingRecipes) : [];

        // If editing an article, update it; otherwise, add a new one
        if (recipeToEdit !== undefined) {
          recipes[recipeIndex] = newRecipe;
          await AsyncStorage.setItem("customRecipes", JSON.stringify(recipes));
          if (onrecipeEdited) onrecipeEdited(); // Notify the edit
        } else {
          recipes.push(newRecipe); // Add new article
          await AsyncStorage.setItem("customRecipes", JSON.stringify(recipes));
        }
        
        if (route.params?.onGoBack) {
            route.params.onGoBack();
        }

        navigation.goBack();


        // navigation.goBack(); // Return to the previous screen
      } catch (error) {
      console.error("Error saving recipe:", error);
    }   
  
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <TextInput
        placeholder="Recipe Name: "
        value={recipeName}
        onChangeText={setRecipeName}
        style={styles.input}
        
      />
      <TextInput
        placeholder="Image URL: "
        value={image}
        onChangeText={setImage}
        style={styles.input}
      />
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <Text style={styles.imagePlaceholder}>Upload Image URL</Text>
      )}
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline={true}
        numberOfLines={4}
        style={[styles.input, { height: hp(20), textAlignVertical: "top" }]}
      />
      <TouchableOpacity onPress={saverecipe} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Recipe</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(4),
  },
  input: {
    marginTop: hp(4),
    borderWidth: 1,
    borderColor: "#ddd",
    padding: wp(.5),
    marginVertical: hp(1),
  },
  image: {
    width: 300,
    height:200,
    margin: wp(2),
  },
  imagePlaceholder: {
    height: hp(20),
    justifyContent: "center",
    alignItems: "center",
    marginVertical: hp(1),
    borderWidth: 1,
    borderColor: "#ddd",
    textAlign: "center",
    padding: wp(2),
  },
  saveButton: {
    backgroundColor: "#4F75FF",
    padding: wp(.5),
    alignItems: "center",
    borderRadius: 5,
    marginTop: hp(2),
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  backButton: {
  backgroundColor: "rgba(170, 227, 160, 1)",
  padding: wp(.7),
  alignItems: "center",
  borderRadius: 5,
  width:200,
  // marginLeft:500
  // marginBottom: hp(2),
  },
  backButtonText: {
  color: "#4F75FF",
  // fontWeight: "600",
  fontSize: hp(2.2),
  },
});
