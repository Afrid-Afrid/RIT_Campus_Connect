from selenium.webdriver.common.by import By
from utils.waits import wait_clickable

class EventPage:
    EVENT_CARDS = (By.CSS_SELECTOR, ".card")
    REGISTER_BUTTON = (By.XPATH, "//button[text()=\x27Register\x27]")

    def __init__(self, driver):
        self.driver = driver

    def get_event_count(self):
        return len(self.driver.find_elements(*self.EVENT_CARDS))

    def register_for_first_event(self):
        wait_clickable(self.driver, self.REGISTER_BUTTON).click()
