import * as core from '@actions/core'

const Android = "Android";
const iOS = "iOS";
const Windows = "Windows";
const WindowsServer = "Windows Server";
const Linux = "Linux";
const LinuxServer = "Linux Server";

function run(): void
{
  try 
  {
    let buildEnvironment = core.getInput('buildEnvironment');
    let buildTargetOne = core.getInput('buildTargetOne');
    let buildTargetTwo = core.getInput('buildTargetTwo');
    let buildTargetThree = core.getInput('buildTargetThree');
    let buildTargetFour = core.getInput('buildTargetFour');
    let buildOS = core.getInput('os');

    if (buildEnvironment == '')
    {
      buildEnvironment = 'Development'
    }

    if (buildTargetOne == '')
    {
      buildTargetOne = 'Android'
    }

    if (buildTargetTwo == '')
    {
      buildTargetTwo = 'iOS'
    }

    if (buildTargetThree == '')
    {
      buildTargetThree = 'Windows Server'
    }

    if (buildTargetFour == '')
    {
      buildTargetFour = 'None'
    }

    let jsonObject = [];
    
    console.log("Build OS")
    console.log(buildOS)

    let item = getMatrixItem(buildTargetOne, buildEnvironment);
    if(item != null)
      jsonObject.push(item);

    item = getMatrixItem(buildTargetTwo, buildEnvironment);
    if(item != null)
      jsonObject.push(item);

    item = getMatrixItem(buildTargetThree, buildEnvironment);
    if(item != null)
      jsonObject.push(item);

    item = getMatrixItem(buildTargetFour, buildEnvironment);
    if(item != null)
      jsonObject.push(item);

    core.setOutput('selectedTarget', JSON.stringify(jsonObject));
  } 
  catch (error) 
  {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

function getMatrixItem(platformName: string, buildEnvironment: string) : any
{
  if(platformName != 'None')
  {
    let platform = getPlatform(platformName);
    let customPlatformName = getCustomPlatformName(platformName);
    let modules = getModules(platformName);
    let subPlatformServer = getSubPlatformServer(platformName);
    let environment = buildEnvironment;
    let item = { platform, customPlatformName, modules, subPlatformServer, environment };
    return item;
  }

  return null;
}

function getPlatform(platformName: string) : string
{
  switch(platformName) 
  { 
    case Android: 
    { 
       return "Android";
    } 
    case iOS: 
    { 
       return "iOS";
    } 
    case Windows: 
    { 
      return "Win64";
    }
    case Linux: 
    { 
      return "Linux64";
    }
    case WindowsServer: 
    { 
      return "Win64";
    }
    case LinuxServer: 
    { 
      return "Linux64";
    }
  }
  return "Android";
}

function getCustomPlatformName(platformName: string) : string
{
  switch(platformName) 
  { 
    case Android: 
    { 
       return "Android";
    } 
    case iOS: 
    { 
       return "iOS";
    } 
    case Windows: 
    { 
      return "Windows64";
    }
    case Linux: 
    { 
      return "Linux64";
    }
    case WindowsServer: 
    { 
      return "WindowsServer64";
    }
    case LinuxServer: 
    { 
      return "LinuxServer64";
    }
  }
  return "Android";
}

function getModules(platformName: string) : string
{
  switch(platformName) 
  { 
    case Android: 
    { 
       return "android";
    } 
    case iOS: 
    { 
       return "ios";
    } 
    case Windows: 
    { 
      return "windows-il2cpp";
    }
    case Linux: 
    { 
      return "linux-il2cpp";
    }
    case WindowsServer: 
    { 
      return "windows-il2cpp, windows-server";
    }
    case LinuxServer: 
    { 
      return "linux-il2cpp, linux-server";
    }
  }
  return "android";
}

function getSubPlatformServer(platformName: string) : string
{
  switch(platformName) 
  { 
    case Android: 
    { 
       return "Player";
    } 
    case iOS: 
    { 
       return "Player";
    } 
    case Windows: 
    { 
      return "Player";
    }
    case Linux: 
    { 
      return "Player";
    }
    case WindowsServer: 
    { 
      return "Server";
    }
    case LinuxServer: 
    { 
      return "Server";
    }
  }
  return "Player";
}

run()