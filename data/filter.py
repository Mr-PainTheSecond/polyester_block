if __name__ == "__main__":
    finalFile = ""
    tempContents = ""
    with open("C:\\Projects\\polyester_block\\data\\easylist.txt", "r") as file:
        tempContents = file.read()
        
    tempArray = tempContents.split("\n")
    
    for el in tempArray:
        if el and el[0] == "!":
            tempArray.remove(el)
        
    finalFile = "\n".join(tempArray)    
    with open("C:\\Projects\\polyester_block\\data\\easylist.txt", "w") as file:
        file.write(finalFile)