from selenium import webdriver
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.common.by import By
from time import sleep

# * Empty Lists
games_list = []
game_free_period_list = []
game_images = []
game_links = []


options = Options()
# * dont show browser
options.add_argument("--headless")

# * webdriver and page
driver = webdriver.Firefox(options=options)
driver.get('https://store.epicgames.com/en-US/free-games')
sleep(1)


# * get free games 
free_games_element = driver.find_element(By.XPATH, '/html/body/div[1]/div/div[4]/main/div[3]/div/div/div/div/div[4]/span/div/div/section/div')
free_games_list = free_games_element.text.split("\n")
length = len(free_games_list)
for i in range(0, length, 3):
    games_list.append(free_games_list[i + 1])
    game_free_period_list.append(free_games_list[i + 2])
# * get free game images
free_games_element_images = free_games_element.find_elements(By.TAG_NAME, 'img')
for image in free_games_element_images:
    game_images.append(image.get_attribute('src'))
# * get free game links
free_games_element_images = free_games_element.find_elements(By.TAG_NAME, 'a')
for image in free_games_element_images:
    game_links.append(image.get_attribute('href'))


print(games_list, game_free_period_list, game_images, game_links)