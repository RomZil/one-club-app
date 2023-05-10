import requests
from bs4 import BeautifulSoup
import json

class Benefit:
    def __init__(self, title, desc):
        self.title = title
        self.desc = desc


URL = "https://www.bankhapoalim.co.il/he/Poalim-Wonder/movies"
page = requests.get(URL)

soup = BeautifulSoup(page.content, "html.parser")
results = soup.find(id="16083")

job_elements = results.find_all("div", class_="team-member")
array_benefits = []
for job_element in job_elements:
    benefit_title = job_element.find("div", class_="team-member-title")
    benefit_description = job_element.find("div", class_="team-member-subtitle")
    benefit = Benefit(benefit_title.text, benefit_description.text)
    array_benefits.append(benefit)

json_array = json.dumps([ob.__dict__ for ob in array_benefits])
print(json_array)

# # Writing to sample.json
# with open("benefits.json", "w") as outfile:
#     outfile.write(json_array)
