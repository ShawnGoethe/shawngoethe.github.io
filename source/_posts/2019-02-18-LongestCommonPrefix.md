---
title: LongestCommonPrefix
date: 2019-02-18 22:47:36
tags:
categories:
- LeetCode
---

# Problem

> Write a function to find the longest common prefix string amongst an array of strings.
>
> If there is no common prefix, return an empty string `""`.
>
> **Example 1:**
>
> ```
> Input: ["flower","flow","flight"]
> Output: "fl"
> ```
>
> **Example 2:**
>
> ```
> Input: ["dog","racecar","car"]
> Output: ""
> Explanation: There is no common prefix among the input strings.
> ```
>
> **Note:**
>
> All given inputs are in lowercase letters `a-z`.

# solution

```java
class Solution {
    public String longestCommonPrefix(String[] strs) {
        int minLength = minLength(strs);
		String same = "";
		boolean isSame=false;
		outer:for(int i=0;i<minLength;i++) {
			char sameCharacter = strs[0].charAt(i);
			isSame = false;
			for(int j=0;j<strs.length;j++) {
				if(strs[j].charAt(i)==sameCharacter) {
					isSame = true;
				}else {
					isSame = false;
					break outer;
				}
			}
			if(isSame=true)same+=sameCharacter;
		}
		return same;
    }
    private int minLength(String[] strs) {
		// TODO Auto-generated method stub
        if(strs.length==0) {
			return 0;
		}
		int min = strs[0].length();
		for(int i=1;i<strs.length;i++) {
			if(strs[i].length()<min) {
				min = strs[i].length();
			}
		}
		return min;
	}
}
```

# key

数学题，没什么关键，但是这个解法，还是存在优化空间

# Perfect

```java
class Solution {
    public String longestCommonPrefix(String[] strs) {
        if (strs == null || strs.length == 0) {
            return "";
        }
        
        String prefix = strs[0];
        
        for (int i = 1; i < strs.length; ++i) {
            while (!strs[i].startsWith(prefix)) {
                prefix = prefix.substring(0, prefix.length() - 1);
                
                if (prefix.isEmpty()) {
                    break;
                }
            }
        }
        
        return prefix;
    }
}
```

