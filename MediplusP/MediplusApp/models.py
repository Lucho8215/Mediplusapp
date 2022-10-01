from django.db import models

class Medicos(models.Model):
    Id_Medico= models.BigIntegerField(primary_key=True)
    NomM = models.CharField(max_length=50)
    ApeM = models.CharField(max_length=50)
    TelM = models.BigIntegerField()
    Especialidad = models.CharField(max_length=50)

class Pacientes(models.Model):
    Cedula = models.BigIntegerField(primary_key=True)
    NomP = models.CharField(max_length=50)
    ApeP = models.CharField(max_length=50)
    FechaNto = models.DateField()
    Edad = models.IntegerField()
    TelP = models.BigIntegerField()
    Direccion = models.CharField(max_length=50)
    Contacto = models.CharField(max_length=50)
    Parentezco = models.CharField(max_length=50)
    TelC = models.BigIntegerField()
    Medico= models.ForeignKey(Medicos, on_delete=models.CASCADE)
