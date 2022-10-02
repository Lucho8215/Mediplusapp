from django.urls import path
from . import views

urlpatterns = [
    path('inicio', views.inicio, name = 'inicio'),
    path('agregarMedico', views.agregar_medico, name = 'agregarMedico'),
    path('listaMedicos', views.lista_medicos, name = 'listaMedicos'),
    path('datosMedico/<int:numero>', views.datos_medico, name = 'datosMedico'),
    path('actualizarMedico/<int:numero>', views.actualizar_medico, name = 'actualizarMedico'),
    path('borrarMedico/<int:numero>', views.borrar_medico, name = 'borrarMedico'),        
    path('agregarPaciente', views.agregar_paciente, name = 'agregarPaciente'),
    path('listaPacientes', views.lista_pacientes, name = 'listaPacientes'),
    path('datosPaciente/<int:numero>', views.datos_paciente, name = 'datosPaciente'),
    path('actualizarPaciente/<int:numero>', views.actualizar_paciente, name = 'actualizarPaciente'),
    path('borrarPaciente/<int:numero>', views.borrar_paciente, name = 'borrarPaciente'),
    ]