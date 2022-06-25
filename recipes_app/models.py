from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class Recipe(models.Model):

    COOK_TIME_CHOICES = [
      ('15min', 'FIFTEEN'), 
      ('30min', 'THIRTY'),
      ('45min', 'FOURTYFIVE'),
      ('1h or more', 'ONE_HOUR_OR_MORE')
    ]

    MAIN_INGREDIENT_CHOICE = [
      ('meat', 'MEAT'), 
      ('fish', 'FISH'),
      ('eggs', 'EGGS'),
      ('vegetables', 'VEGETABLES'),
      ('fruit', 'FRUIT'),
      ('dairy', ' DAIRY'),
      ('grain', 'GRAIN'),
      ('tubers', 'TUBERS'),
      ('legumes', 'LEGUMES'),
    ]

    title = models.CharField(max_length=100, default=None)
    ingredients = ArrayField(models.CharField(max_length=50))
    method = models.TextField(max_length=3000, default=None)
    cook_time = models.CharField(max_length=10, choices=COOK_TIME_CHOICES, default=None)
    main_ingredient = models.CharField(max_length=20, choices=MAIN_INGREDIENT_CHOICE, default=None)
    image = models.CharField(max_length=300, default=None)
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name='recipes',
        on_delete=models.CASCADE
    )

    def __str__(self):
      return f"{self.title}"