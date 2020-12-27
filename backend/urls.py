from django.contrib import admin
from django.urls import path,include,re_path
from django.contrib.staticfiles.urls import staticfiles_urlpatterns,static
from . import settings
from .views import index
from django.views.generic import TemplateView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', include('rest_auth.urls'), name='socialaccount_signup'),
    path('users/registeration/', include('rest_auth.registration.urls')),
    path('songs/', include('songs.urls')),
    path('user/', include('user.urls')),
]


urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += re_path(r'', TemplateView.as_view(template_name='index.html')),
