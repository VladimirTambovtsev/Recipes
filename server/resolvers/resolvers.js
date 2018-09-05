exports.resolvers = {
	Query: {
		getAllRecipes: async (root, args, { Recipe }) => {
	      const allRecipes = await Recipe.find().sort({ createdDate: "desc" });
	      return allRecipes;
	    },
	},
	Mutation: {
		createRecipe: async (root, { name, description, category, instructions, username }, { Recipe }) => {
			return await new Recipe({
				name,
				description,
				category,
				instructions,
				username
			}).save()
		}
	}
};