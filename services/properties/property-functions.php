<?php

	function fnDeletePropertyDirectory($sPath)
	{
		if (is_dir($sPath) === true)
		{
			$files = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($sPath), RecursiveIteratorIterator::CHILD_FIRST);

			foreach ($files as $file)
			{
				if (in_array($file->getBasename(), array('.', '..')) !== true)
				{
					if ($file->isDir() === true)
					{
						rmdir($file->getPathName());
					}

					else if (($file->isFile() === true) || ($file->isLink() === true))
					{
						unlink($file->getPathname());
					}
				}
			}

			return rmdir($sPath);
		}

		else if ((is_file($sPath) === true) || (is_link($sPath) === true))
		{
			return unlink($sPath);
		}

		return false;
	}


?>