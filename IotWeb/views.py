from django.shortcuts import render
from django.http import JsonResponse


def main(request):
    # Crear el contexto con la variable global
    context = {

    }
    # Renderizar la plantilla 'main.html' con el contexto
    return render(request, 'main.html', context)


def solar_api(request):
    # Crear el contexto con la variable global
    prediction = {
        "result": {
            "watts": {
                "2024-04-21 07:25:47": 0,
                "2024-04-21 08:00:00": 786,
                "2024-04-21 09:00:00": 2432,
                "2024-04-21 10:00:00": 4432,
                "2024-04-21 11:00:00": 6150,
                "2024-04-21 12:00:00": 7298,
                "2024-04-21 13:00:00": 8034,
                "2024-04-21 14:00:00": 8092,
                "2024-04-21 15:00:00": 7397,
                "2024-04-21 16:00:00": 6226,
                "2024-04-21 17:00:00": 4754,
                "2024-04-21 18:00:00": 3077,
                "2024-04-21 19:00:00": 1530,
                "2024-04-21 20:00:00": 705,
                "2024-04-21 20:59:46": 0,
                "2024-04-22 07:24:22": 0,
                "2024-04-22 08:00:00": 814,
                "2024-04-22 09:00:00": 2534,
                "2024-04-22 10:00:00": 4546,
                "2024-04-22 11:00:00": 6244,
                "2024-04-22 12:00:00": 7450,
                "2024-04-22 13:00:00": 8132,
                "2024-04-22 14:00:00": 8203,
                "2024-04-22 15:00:00": 7710,
                "2024-04-22 16:00:00": 6720,
                "2024-04-22 17:00:00": 5264,
                "2024-04-22 18:00:00": 3427,
                "2024-04-22 19:00:00": 1741,
                "2024-04-22 20:00:00": 521,
                "2024-04-22 21:00:00": 212,
                "2024-04-22 21:00:49": 0
            },
            "watt_hours_period": {
                "2024-04-21 07:25:47": 0,
                "2024-04-21 08:00:00": 224,
                "2024-04-21 09:00:00": 1609,
                "2024-04-21 10:00:00": 3432,
                "2024-04-21 11:00:00": 5291,
                "2024-04-21 12:00:00": 6724,
                "2024-04-21 13:00:00": 7666,
                "2024-04-21 14:00:00": 8063,
                "2024-04-21 15:00:00": 7745,
                "2024-04-21 16:00:00": 6812,
                "2024-04-21 17:00:00": 5490,
                "2024-04-21 18:00:00": 3916,
                "2024-04-21 19:00:00": 2304,
                "2024-04-21 20:00:00": 1118,
                "2024-04-21 20:59:46": 351,
                "2024-04-22 07:24:22": 0,
                "2024-04-22 08:00:00": 242,
                "2024-04-22 09:00:00": 1674,
                "2024-04-22 10:00:00": 3540,
                "2024-04-22 11:00:00": 5395,
                "2024-04-22 12:00:00": 6847,
                "2024-04-22 13:00:00": 7791,
                "2024-04-22 14:00:00": 8168,
                "2024-04-22 15:00:00": 7957,
                "2024-04-22 16:00:00": 7215,
                "2024-04-22 17:00:00": 5992,
                "2024-04-22 18:00:00": 4346,
                "2024-04-22 19:00:00": 2584,
                "2024-04-22 20:00:00": 1131,
                "2024-04-22 21:00:00": 367,
                "2024-04-22 21:00:49": 1
            },
            "watt_hours": {
                "2024-04-21 07:25:47": 0,
                "2024-04-21 08:00:00": 224,
                "2024-04-21 09:00:00": 1833,
                "2024-04-21 10:00:00": 5265,
                "2024-04-21 11:00:00": 10556,
                "2024-04-21 12:00:00": 17280,
                "2024-04-21 13:00:00": 24946,
                "2024-04-21 14:00:00": 33009,
                "2024-04-21 15:00:00": 40754,
                "2024-04-21 16:00:00": 47566,
                "2024-04-21 17:00:00": 53056,
                "2024-04-21 18:00:00": 56972,
                "2024-04-21 19:00:00": 59276,
                "2024-04-21 20:00:00": 60394,
                "2024-04-21 20:59:46": 60745,
                "2024-04-22 07:24:22": 0,
                "2024-04-22 08:00:00": 242,
                "2024-04-22 09:00:00": 1916,
                "2024-04-22 10:00:00": 5456,
                "2024-04-22 11:00:00": 10851,
                "2024-04-22 12:00:00": 17698,
                "2024-04-22 13:00:00": 25489,
                "2024-04-22 14:00:00": 33657,
                "2024-04-22 15:00:00": 41614,
                "2024-04-22 16:00:00": 48829,
                "2024-04-22 17:00:00": 54821,
                "2024-04-22 18:00:00": 59167,
                "2024-04-22 19:00:00": 61751,
                "2024-04-22 20:00:00": 62882,
                "2024-04-22 21:00:00": 63249,
                "2024-04-22 21:00:49": 63250
            },
            "watt_hours_day": {
                "2024-04-21": 60745,
                "2024-04-22": 63250
            }
        },
        "message": {
            "code": 0,
            "type": "success",
            "text": "",
            "pid": "9M80CQ5v",
            "info": {
                "latitude": 40.5204,
                "longitude": -3.5446,
                "distance": 0,
                "place": "Calle Ronda de los Llanos, 28860 Paracuellos de Jarama, Spain",
                "timezone": "Europe/Madrid",
                "time": "2024-04-21T11:07:19+02:00",
                "time_utc": "2024-04-21T09:07:19+00:00"
            },
            "ratelimit": {
                "zone": "IP 2.139.149.12",
                "period": 3600,
                "limit": 12,
                "remaining": 9
            }
        }
    }
    # Renderizar la plantilla 'main.html' con el contexto
    return JsonResponse(prediction)
