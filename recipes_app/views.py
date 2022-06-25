from tkinter import E
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound

from comments.serializers.populated import PopulatedCommentSerializer

# custom imports
from .models import Recipe
from .serializers.common import RecipeSerializer
from .serializers.populated import PopulatedRecipeSerializer

# import permissions 
from rest_framework.permissions import IsAuthenticatedOrReadOnly

class RecipeListView(APIView):

  permission_classes = (IsAuthenticatedOrReadOnly, )

  # GET - Get all recipes
  def get(self, _request):
    recipes = Recipe.objects.all()
    serialized_recipes = RecipeSerializer(recipes, many=True)
    return Response(serialized_recipes.data, status=status.HTTP_200_OK)

  # POST - Add a recipe
  def post(self, request):
    deserialized_recipe = RecipeSerializer(data=request.data)
    print('deserialized request --->', request.data)
    try:
      deserialized_recipe.is_valid()
      deserialized_recipe.save()
      return Response(deserialized_recipe.data, status.HTTP_201_CREATED)
    
    except Exception as e:
      print(e)
      return Response({ 'detail': str(e) }, status.HTTP_422_UNPROCESSABLE_ENTITY)


class RecipeDetailView(APIView):

  permission_classes = (IsAuthenticatedOrReadOnly, )

  # Find a specific recipe
  def get_recipe(self, pk):
    try:
      return Recipe.objects.get(pk=pk)
    except Recipe.DoesNotExist as e:
        print(e)
        raise NotFound({ 'detail': str(e) })

  # GET - Return one specific recipe
  def get(self, _request, pk):
    recipe = self.get_recipe(pk)
    serialized_recipe = PopulatedRecipeSerializer(recipe)
    return Response(serialized_recipe.data, status.HTTP_200_OK)

  # DELETE - Delete one specific recipe
  def delete(self, _request, pk):
    recipe_to_delete = self.get_recipe(pk)
    recipe_to_delete.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

  # PUT - Update one specific recipe
  def put(self, request, pk):
    recipe_to_update = self.get_recipe(pk=pk)
    print(type(recipe_to_update))
    deserialized_recipe = RecipeSerializer(recipe_to_update, request.data)
    try:
        deserialized_recipe.is_valid()
        deserialized_recipe.save()
        return Response(deserialized_recipe.data, status.HTTP_202_ACCEPTED)
    except Exception as e:
        print(e)
        return Response({ 'detail': str(e) }, status.HTTP_422_UNPROCESSABLE_ENTITY)