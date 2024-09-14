from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static

admin.site.site_header =" TESKO DUDE ADMIN "
admin.site.site_title =" TESKO DUDE ADMIN "

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/",include("app.urls")),
]

urlpatterns+=static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
# The above line is used to displayb the image in admin pannel actually the above line is added to the urlpatters=[] when we click on image link in admin table
