from .common import RecipeSerializer
from comments.serializers.populated import PopulatedCommentSerializer
from jwt_auth.serializers.common import UserSerializer



class PopulatedRecipeSerializer(RecipeSerializer):
    comments = PopulatedCommentSerializer(many=True)
    owner = UserSerializer()
