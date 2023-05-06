from django.db import models

# Create your models here.


class Product(models.Model):
    name = models.CharField(max_length=200)
    image = models.ImageField(upload_to='products/images/')
    product = models.CharField(max_length=200)
    description = models.TextField()
    is_deleted = models.BooleanField(default=False)
    is_favorite = models.BooleanField(default=False)

    def __str__(self):
        return self.name
