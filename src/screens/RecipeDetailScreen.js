import {View,Text,ScrollView,TouchableOpacity,Image,StyleSheet,FlatList,} from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux"; // Redux hooks
import { toggleFavorite } from "../redux/favoritesSlice"; // Redux action

export default function RecipeDetailScreen(props) {
  const food = props.route.params; // recipe passed from previous screen

  const dispatch = useDispatch();
  const favoriterecipes = useSelector(
    (state) => state.favorites.favoriteRecipes
  );
  const isFavourite = favoriterecipes?.some(
    (favrecipe) => favrecipe.idFood === food.idFood
  ); // Check by idFood

  const navigation = useNavigation();



  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(food)); // Dispatch the recipe to favorites
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent} >
      {/* recipe Image */}
      <View style={styles.imageContainer} testID="imageContainer">

        <Image
          source={{ uri: food.recipeImage }}
          style={styles.recipeImage}
        />
     
      </View>

      {/* Back Button and Favorite Button */}
      <View style={styles.topButtonsContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleToggleFavorite}
          style={[
            styles.favoriteButton,
            {
              backgroundColor: "white",
            },
          ]}
        >
          <Text>{isFavourite ? "♥" : "♡"}</Text>
        </TouchableOpacity>
      </View>

      {/* recipe Description */}
  
      <View style={styles.contentContainer}>
        {/* Title and Category */}
        <View style={styles.recipeDetailsContainer}
          testID="recipeDetailsContainer" >
          <Text style={styles.recipeTitle} testID="recipeTitle">
        
            {food.recipeName}
            
          </Text>
          <Text style={styles.recipeCategory} testID="recipeCategory">
            {"\n"}
            {food.recipeCategory} | {food.recipeOrigin}
            {"\n"}
          
          </Text>
        </View>

        {/* Time Services Calories Temp */}    
        <View style={styles.miscContainer}>   
          <View style={styles.miscItem}>
            <Text style={styles.miscIcon}>🕒</Text>
            <Text style={styles.miscText}>{food.Time}</Text>
          </View>
          <View style={styles.miscItem}>
            <Text style={styles.miscIcon}>👥</Text>
            <Text style={styles.miscText}>{food.Servings}</Text>
          </View>
          <View style={styles.miscItem}>
            <Text style={styles.miscIcon}>🔥</Text>
            <Text style={styles.miscText}>{food.Cal}</Text>
          </View>
          <View style={styles.miscItem}>
            <Text style={styles.miscIcon}>🎚️</Text>
            <Text style={styles.miscText}>{food.Temp}</Text>
          </View>
        </View>


        {/* Ingredients */}
        <View style={styles.sectionContainer}>

          <Text style={styles.sectionTitle} testID="recipeTitle">
        
              {"Ingredients"}
              
          </Text>
            
          <FlatList
            data={food.ingredients} 
            keyExtractor={item => item.idFood}
            renderItem={({ item }) => ( 

              <View style={styles.ingredientItem}>
                <Text style={styles.ingredientBullet}>{'\u2022'}</Text> <Text style={styles.ingredientItem}>{item.measure}  -  {item.ingredientName}</Text>
              </View>

            )}
          />
            

        </View>

        {/* Instructions */}
        <View style={styles.sectionContainer} testID="sectionContainer">

          <Text style={styles.sectionTitle} testID="recipeTitle">
        
              {"Instructions"}
              
          </Text>
          <Text style={styles.recipeDetailsContainer} testID="recipeCategory">
              {"\n"}
              {food.recipeInstructions}
              {"\n"}
            
          </Text>

        </View>


      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  recipeImage: {
    width: wp(98),
    height: hp(40),
    borderRadius: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    marginTop: 4,
  },
  topButtonsContainer: {
    width: "100%",
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: hp(4),
  },
  backButton: {
    padding: 8,
    borderRadius: 50,
    marginLeft: wp(5),
    backgroundColor: "white",
  },
  favoriteButton: {
    padding: 8,
    borderRadius: 50,
    borderWidth: 1,
    marginRight: wp(5),
  },

  contentContainer: {
    paddingHorizontal: wp(4),
    paddingTop: hp(4),
  },
  recipeDetailsContainer: {
    marginBottom: hp(2),
  },
  recipeTitle: {
    fontSize: hp(3),
    fontWeight: "bold",
    color: "#4B5563", // text-neutral-700
    textAlign: "center",
  },
  recipeCategory: {
    fontSize: hp(2),
    fontWeight: "500",
    color: "#9CA3AF", // text-neutral-500
    textAlign: "center",
  },
  sectionContainer: {
    marginBottom: hp(2),
  },
  sectionTitle: {
    fontSize: hp(2.5),
    fontWeight: "bold",
    color: "#4B5563", // text-neutral-700
  },
  miscContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    paddingHorizontal: wp(4),
  },
  miscItem: {
    backgroundColor: "#F5F5F5",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    elevation: 3,
  },
  miscIcon: {
    fontSize: hp(3.5),
    marginBottom: 5,
    textAlign: 'center',
    alignItems: "center",
  },
  miscText: {
    fontSize: hp(2),
    fontWeight: "600",
    fontFamily: "Lato",
    alignItems: "center",
    textAlign: 'center',
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp(1),
    padding: 10,
    backgroundColor: "#FFF9E1",
    borderRadius: 8,
    elevation: 2,
  },
  ingredientBullet: {
    backgroundColor: "#FFD700",
    borderRadius: 50,
    height: hp(1.5),
    width: hp(1.5),
    marginRight: wp(2),
  },
});
