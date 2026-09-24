from selenium.webdriver.common.by import By
from utils.waits import wait_clickable

class ProfilePage:
    NAME_INPUT = (By.NAME, "name")
    PHONE_INPUT = (By.NAME, "phone")
    SAVE_BUTTON = (By.XPATH, "//button[text()=\x27Save Changes\x27]")

    def __init__(self, driver):
        self.driver = driver

    def update_phone(self, phone):
        field = self.driver.find_element(*self.PHONE_INPUT)
        field.clear()
        field.send_keys(phone)
        wait_clickable(self.driver, self.SAVE_BUTTON).click()
