from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm, AuthenticationForm
from .models import User


class CreateUserForm(UserCreationForm):
    email = forms.EmailField()

    def __init__(self, *args, **kwargs):
        super(CreateUserForm, self).__init__(*args, **kwargs)

        self.fields['name'].required = True
        self.fields['email'].label = 'E-mail'
        self.fields['name'].label = 'Nome'
        self.fields['password1'].label = 'Senha'
        self.fields['password2'].label = 'Repita a senha'

    def clean(self):
        cleaned_data = super(CreateUserForm, self).clean()
        email = cleaned_data.get("email")
        senha1 = cleaned_data.get("password1")
        senha2 = cleaned_data.get("password2")
        username = cleaned_data.get("username")

        userWithUsername = User.objects.filter(username=username)
        userWithEmail = User.objects.filter(email=email)

        if userWithUsername:
            raise forms.ValidationError("Nome de usuario já existe")

        if userWithEmail:
            raise forms.ValidationError("Email ja utilizado")

        if senha1 != senha2:
            raise forms.ValidationError("As senhas devem coincidir")

        return cleaned_data

    class Meta(UserCreationForm):
        model = User
        fields = ['email', 'name', 'username', 'password1', 'password2']


class LoginUserForm(AuthenticationForm):
    def __init__(self, *args, **kwargs):
        super(LoginUserForm, self).__init__(*args, **kwargs)

        self.fields['email'].label = 'Email'
        self.fields['password'].label = 'Senha'

    class Meta:
        model = User
        fields = ['email', 'password']
        labels = {'email': 'E-mail', 'password': 'Senha'}

        widget = {
            'password':
            forms.PasswordInput(attrs={'placeholder': 'Sua senha'}),
            'email': forms.TextInput(attrs={'placehoder': 'Seu email'})
        }


class UpdateUserForm(UserChangeForm):
    class Meta:
        model = User
        fields = ['name', 'isOpened', 'email', 'picture' , 'password']


# class UpdateUserForm(UserChangeForm):
#     class Meta:
#         model = User
#         fields = ['name', 'isOpened', 'email', 'password']
