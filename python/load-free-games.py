from selenium import webdriver
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.common.by import By
from time import sleep
import sqlite3
from sqlite3 import Error

class Db:
    def connectDb(self):
        try:
            connection = sqlite3.connect('database.db')
            return connection
        except Error as error:
            print(f"ERROR: {error}")

    def create_cursor(self, connection: sqlite3.Connection):
        try:
            cursor = connection.cursor()
            return cursor
        except Error as error:
            print(f"ERROR: {error}")

    def create_table_free_games(self, cursor: sqlite3.Cursor):
        try:
            cursor.execute("""CREATE TABLE IF NOT EXISTS free_games(
            gameId INTEGER PRIMARY KEY,
            gameName VARCHAR(255) NOT NULL,
            gameImage VARCHAR(500) NOT NULL,
            gamePage VARCHAR(500) NOT NULL,
            gameFreePeriod VARCHAR(255) NOT NULL
            )""")
        except Error as error:
            print(f"ERROR: {error}")

    def insert_to_table(self, connection: sqlite3.Connection, cursor: sqlite3.Cursor, 
                        game_name_list: list, game_free_period_list: list, game_images: list, 
                        game_links:list):
        
        try:
            query = "DELETE FROM free_games"
            cursor.execute(query)
            length = len(game_free_period_list)
            for i in range(0, length, 1):
                query = "INSERT INTO free_games (gameName, gameImage, gamePage, gameFreePeriod) VALUES (?, ?, ?, ?)"
                dataArray = (game_name_list[i], game_images[i], game_links[i], game_free_period_list[i])
                cursor.execute(query, dataArray)
                connection.commit()
        except Error as error:
            print(f"ERROR: {error}")

def get_eg_free_games():
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


    # print(games_list, game_free_period_list, game_images, game_links)
    return games_list, game_free_period_list, game_images, game_links


# Main Program
if __name__ == "__main__":
    db = Db()
    con = db.connectDb()
    cur = db.create_cursor(con)
    db.create_table_free_games(cur)
    games_list, game_free_period_list, game_images, game_links = get_eg_free_games()
    db.insert_to_table(con, cur, games_list, game_free_period_list, game_images, game_links)