const {Builder,By,Key,util} = require("selenium-webdriver");
const { Driver } = require("selenium-webdriver/chrome");
var city = "Toronto"
var street = "Blackbush"
async function get_list(){
    let driver = await new Builder().forBrowser("firefox").build()
    await driver.get("https://www.canada411.ca/search/address.html")
    await driver.findElement(By.xpath('//*[@id="c411AddressCity"]')).sendKeys(street)
    await driver.findElement(By.xpath('//*[@id="AddressSearch"]/div/div[2]/input')).sendKeys(city)
    await driver.findElement(By.xpath('//*[@id="AddressSearch"]/div/div[3]/select/option[10]')).click()
    await driver.findElement(By.xpath('//*[@id="c411AddressFind"]')).click()

    let numResults = await driver.findElement(By.xpath('/html/body/div[5]/div[2]/div[1]/div[2]/div[1]/h1')).text.split()[0]

    if (numResults.contains(",")){
        numResults = numResults.split()
        numResults = numResults.join("")
    }
    numResults = parseInt(numResults)
    let complete_list = []
    let count = 1
    let c1, c2, c3,name,phone,address


    for (i = 1; i <= numResults; i++){
        console.log(1)
        c1 = 'ContactName'+count
        c2 = 'ContactPhone'+count
        c3 = 'ContactAddress'+count

        name = await driver.findElement(By.text(c1))
        phone = await driver.findElement(By.text(c2))
        address = await driver.findElement(By.text(c3))
        complete_list.push(new Person(name,phone,address))

        if (count%15 === 0){
            count = 0
            try{
                await driver.findElement(By.linkText('Next')).click()
            }catch(err){

            }
        }

    }
}

get_list()
