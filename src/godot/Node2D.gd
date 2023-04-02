extends Node2D

@onready var garra = $CharacterBody2D
@onready var res

# Called when the node enters the scene tree for the first time.
func _ready():
	print(garra.scale)
	
	


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	OS.delay_msec(100)
	$HTTPRequest.request('http://localhost:3000/dados')
	


func _on_http_request_request_completed(result, response_code, headers, body):
	res = body.get_string_from_utf8()
	res = res.replace("[","")
	res = res.replace("]","")
	res = JSON.parse_string(res)
	garra.position.x = res.x
	garra.position.y = res.y 
	garra.scale = Vector2(res.z,res.z)
	print(res)
