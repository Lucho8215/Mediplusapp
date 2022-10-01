from django.urls import path
from . import views

urlpatterns = [
    path('inicio', views.inicio, name = 'inicio'),
    path('agregarMedico', views.agregar_medico, name = 'agregarMedico'),
    path('agregarPaciente', views.agregar_paciente, name = 'agregarPaciente'),
    path('datosPaciente/<int:numero>', views.datos_paciente, name = 'datosPaciente'),
    path('listaPacientes', views.lista_pacientes, name = 'listaPacientes'),
    path('actualizarPaciente/<int:numero>', views.actualizar_paciente, name = 'actualizarPaciente'),
    path('borrarPaciente/<int:numero>', views.borrar_paciente, name = 'borrarPaciente'),
    ]