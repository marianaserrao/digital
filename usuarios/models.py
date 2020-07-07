from django.db import models
from django.core.mail import send_mail
from django.contrib.auth.models import AbstractUser
from piupiuwerdjango.settings import EMAIL_HOST_USER

# Create your models here.


class User(AbstractUser):
    name = models.CharField(max_length=200)
    day = models.IntegerField(null=True, blank=True)
    month = models.IntegerField(null=True, blank=True)
    year = models.IntegerField(null=True, blank=True)
    followers = models.ManyToManyField("self",
                                       symmetrical=False,
                                       blank=True,
                                       related_name="seguidores")
    follow_requests = models.ManyToManyField("self",
                                             symmetrical=False,
                                             blank=True,
                                             related_name="solicitantes")
    following = models.ManyToManyField("self",
                                       symmetrical=False,
                                       blank=True,
                                       related_name="seguindo")
    pius = models.IntegerField(default=0)
    picture = models.ImageField(upload_to='profile/', null=True, blank=True)
    isOpened = models.BooleanField(default=True)
    emailConfirmed = models.BooleanField(default=False)

    def _str_(self):
        return self.username

    def follower_numbers(self):
        follower_numbers = self.follower.count()
        return follower_numbers

    def plus_pius(self):
        self.pius += 1
        self.save()

    def minus_pius(self):
        self.pius -= 1
        self.save()

    def send_email(self, subject, message, recepient):
        send_mail(subject,
                  message,
                  EMAIL_HOST_USER, [recepient],
                  fail_silently=False)
