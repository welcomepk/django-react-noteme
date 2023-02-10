
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Note
from .serializers import NoteSerializer
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse
from django.shortcuts import get_object_or_404


@ensure_csrf_cookie
def get_csrf(request):
    return JsonResponse({'csrfToken': request.COOKIES.get('csrftoken')})


@api_view(['GET'])
def getRoutes(requeset):
    routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
    ]
    return Response(routes)
    return JsonResponse(routes, safe=False)


@api_view(['GET'])
def getNotes(request):
    notes = Note.objects.all().order_by('-updated')
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getNote(request, pk):
    note = Note.objects.get(id=pk)
    serializer = NoteSerializer(note)
    return Response(serializer.data)


@api_view(['POST'])
def createNote(request):
    serializer = NoteSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def updateNote(request, pk):
    data = request.data
    print("in update view", data)
    note = Note.objects.get(id=pk)
    serializer = NoteSerializer(instance=note, data=data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def deleteNote(request, pk):
    note = get_object_or_404(Note, id=pk)
    note.delete()
    return Response(data={"detail": "note was deleted successfully"}, status=status.HTTP_204_NO_CONTENT)


# Now its time to create a Serializers for API.

# Serializers allow complex data such as querysets and model instances to be converted to native Python datatypes that can then be easily rendered into JSON, XML or other content types. Serializers also provide deserialization, allowing parsed data to be converted back into complex types, after first validating the incoming data.

# First, create a file called serializers.py and add the below code.


# from rest_framework import serializers
# from students.models import Students

# class StudentSerializers(serializers.ModelSerializer):
#     class Meta:
#         model = Students
#         fields = ["id","name","score"]

# in the fields, sections above you can use __all__ to add all the columns for serializations. If you want to capture individual ones you can pass a list of column names.


# 6. Updating the views.py

# Finally, let's create Views.py

# First we need to be able to fetch all the results by performing a GET and also should be able to add a new student record.

# The below code helps you fetch all records on GET and add new student details. The core of this functionality is the api_view decorator, which takes a list of HTTP methods that your view should respond to. For example, this is how you would write a very simple view that just manually returns some data:


# @api_view(['GET','POST'])
# def students_list(request):
#     if request.method == 'GET':
#         students = Students.objects.all()
#         serializers = StudentSerializers(students,many=True)
#         return Response(serializers.data)

#     elif(request.method == 'POST'):
#         serializers = StudentSerializers(data=request.data)
#         if serializers.is_valid():
#             serializers.save()
#             return Response(serializers.data,status=status.HTTP_201_CREATED)
#         return Response(serializers.errors,status=status.HTTP_400_BAD_REQUEST)


# work with individual student records using GET,PUT,DELETE

# The PK here is the primary key column in your database which is ID in our case.


# api_view(['GET','PUT','DELETE'])
# def students_details(request,pk):
#     try:
#         student = Students.objects.get(pk=pk)
#     except Students.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     if request.method == 'GET':
#         serializers = StudentSerializers(Students)
#         return Response(serializers.data)

#     elif request.method == 'PUT':
#         serializers = StudentSerializers(Students,request.data)
#         if serializers.is_valid():
#             serializers.save()
#             return Response(serializers.data)
#         return Response(serializers.errors,status=status.HTTP_400_BAD_REQUEST)

#     elif request.method == 'DELETE':
#         Students.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)
