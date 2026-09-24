from selenium.webdriver.common.by import By

class CoursePage:
    COURSE_CARDS = (By.CSS_SELECTOR, ".card")

    def __init__(self, driver):
        self.driver = driver

    def get_course_count(self):
        return len(self.driver.find_elements(*self.COURSE_CARDS))

    def open_course_by_name(self, name):
        self.driver.find_element(By.LINK_TEXT, name).click()
