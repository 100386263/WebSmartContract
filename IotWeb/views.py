from django.shortcuts import render


def main(request):
    # Crear el contexto con la variable global
    context = {

    }
    # Renderizar la plantilla 'main.html' con el contexto
    return render(request, 'main.html', context)