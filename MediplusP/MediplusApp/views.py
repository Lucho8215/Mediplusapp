import datetime
import json
from django.shortcuts import render
from django.http import HttpResponse,HttpResponseBadRequest,HttpResponseNotAllowed

from .models import Medicos, Pacientes

def inicio(request):
    return HttpResponse("Bienvenido a Mediplus: Hospital en casa")

def agregar_medico(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            medico = Medicos.objects.filter(Id_Medico = data["Id_Medico"]).first()
            if (medico):
                return HttpResponseBadRequest("El codigo del medico ya existe")
            medico = Medicos(
                Id_Medico = data["Id_Medico"],
                NomM = data["Nombres"],
                ApeM = data["Apellidos"],
                TelM = data["Telefono"],
                Especialidad = data["Especialidad"]
                )
            medico.save()
            return HttpResponse("Nuevo Medico agregado")
        except:
            return HttpResponseBadRequest("Error en los datos enviados")
    else:
        return HttpResponseNotAllowed(['POST'], "Metodo invalido")

def agregar_paciente(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            tratante = Medicos.objects.filter(Id_Medico = data["Id_Medico"]).first()
            if (not tratante):
                return HttpResponseBadRequest("El Medico asignado no existe")
            paciente = Pacientes(
                Cedula = data["Cedula"],
                NomP = data["Nombres"],
                ApeP = data["Apellidos"],
                FechaNto = data["FechaNto"],
                Edad = data["Edad"],
                TelP = data["Telefono"],
                Direccion = data["Direccion"],
                Contacto = data["Contacto"],
                Parentezco = data["Parentezco"],
                TelC = data["Tel_Contacto"],
                Medico = tratante
                            )
            paciente.save()
            return HttpResponse("Nuevo paciente agregado")
        except:
            return HttpResponseBadRequest("Error en los datos enviados")
    else:
        return HttpResponseNotAllowed(['POST'], "Metodo invalido")

def lista_pacientes(request):
    if request.method == 'GET':
        datos = Pacientes.objects.all()
        if (not datos):
            return HttpResponseBadRequest("No hay pacientes en la base de datos")
        info = []
        for x in datos:
            data = {
                "Cedula": x.Cedula,
                "Nombres": x.NomP,
                "Apellidos": x.ApeP,
                "FechaNto": str(x.FechaNto),
                "Edad": x.Edad,
                "Telefono": x.TelP,
                "Direccion": x.Direccion,
                "Contacto": x.Contacto,
                "Parentezco": x.Parentezco,
                "Tel_Contacto": x.TelC
                }
            info.append(data)
        dataJson = json.dumps(info)
        resp = HttpResponse()
        resp.headers['Content-Type'] = "text/json"
        resp.content = dataJson
        return resp
    else:
        return HttpResponseNotAllowed(['GET'], "Metodo invalido")

def datos_paciente(request, numero):
    if request.method == 'GET':
        datos = Pacientes.objects.filter(Cedula = numero).first()
        if (not datos):
            return HttpResponseBadRequest("El paciente con este documento no esta en la lista")
        data = {
                "Cedula": datos.Cedula,
                "Nombres": datos.NomP,
                "Apellidos": datos.ApeP,
                "FechaNto": str(datos.FechaNto),
                "Edad": datos.Edad,
                "Telefono": datos.TelP,
                "Direccion": datos.Direccion,
                "Contacto": datos.Contacto,
                "Parentezco": datos.Parentezco,
                "Tel_Contacto": datos.TelC,
                }
        dataJson = json.dumps(data)
        resp = HttpResponse()
        resp.headers['Content-Type'] = "text/json"
        resp.content = dataJson
        return resp
    else:
        return HttpResponseNotAllowed(['GET'],"Metodo Inválido")

def actualizar_paciente(request, numero):
    if request.method == 'PUT':
        try:
            datos = Pacientes.objects.filter(Cedula = numero).first()
            if (not datos):
                return HttpResponseBadRequest("No existe paciente con ese documento de identificacion")
            
            data = json.loads(request.body)  
            datos.NomP = data["Nombres"]
            datos.ApeP = data["Apellidos"]
            datos.FechaNto = data["FechaNto"]
            datos.Edad = data["Edad"]
            datos.TelP = data["Telefono"]
            datos.Direccion = data["Direccion"]
            datos.Contacto = data["Contacto"]
            datos.Parentezco = data["Parentezco"]
            datos.TelC = data["Tel_Contacto"]
            datos.save()
            print(datos)
            return HttpResponse("Datos de paciente actualizados")
        except:
            return HttpResponseBadRequest("Error en los datos enviados")
    else:
        return HttpResponseNotAllowed(['PUT'], "Metodo invalido")

def borrar_paciente(request, numero):
    if request.method == 'PUT':
        try:
            paciente = Pacientes.objects.filter(Cedula = numero)
            if (not paciente):
                return HttpResponseBadRequest("No existe paciente con ese documento de identificacion")    
            paciente.delete()
            return HttpResponse("Los datos del paciente fueron borrados")
        except:
            return HttpResponseBadRequest("Error en los datos enviados")
    else:
        return HttpResponseNotAllowed(['PUT'], "Metodo invalido")