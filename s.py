import requests
import random


def count_left_api():
	response = requests.get("http://127.0.0.1:3000/nor/count")
	data = response.json() #.get('COUNT(*)')
	d2=str(data[0]).split(":")
	d2=d2[1].replace('}',"")
	d3=d2.replace(' ',"")
	count_left_count = d3

	return count_left_count

def get_random_api():
	response = requests.get("http://127.0.0.1:3000/nor/ran")
	data = response.json()
	data_id = data[0].get('id')
	data_cnf_names = data[0].get('cnf_names')
	data_used = data[0].get('used')
	# print(data_id,data_cnf_names,data_used)
	return data_id,data_cnf_names,data_used


i,ii,iii=get_random_api()
count_left_count=count_left_api()
print(" [ ",i, " ]  [ ",ii, " ] [ ",iii, " ]\n", "Count left : "+count_left_count)
