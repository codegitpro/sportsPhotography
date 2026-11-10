package com.cl.controller;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.text.ParseException;
import java.util.*;
import java.lang.*;
import java.math.*;
import java.util.stream.Collectors;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

import com.cl.utils.*;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.cl.annotation.IgnoreAuth;
import com.cl.annotation.SysLog;

import com.cl.entity.NewsEntity;
import com.cl.entity.view.NewsView;

import com.cl.service.NewsService;
import com.cl.service.TokenService;

/**
 * 新闻资讯
 * 后端接口
 * @author 
 * @email 
 * @date 2026-03-12 19:47:39
 */
@RestController
@RequestMapping("/news")
public class NewsController {
    @Autowired
    private NewsService newsService;









    /**
     * 后台列表
     */
    @RequestMapping("/page")
    public R page(@RequestParam Map<String, Object> params,NewsEntity news,
                                                                                HttpServletRequest request){
                                    EntityWrapper<NewsEntity> ew = new EntityWrapper<NewsEntity>();
                                                                                                                    
        
        
        PageUtils page = newsService.queryPage(params, MPUtil.sort(MPUtil.between(MPUtil.likeOrEq(ew, news), params), params));
        Map<String, String> deSens = new HashMap<>();
                                                                                                //给需要脱敏的字段脱敏
        DeSensUtil.desensitize(page,deSens);
        return R.ok().put("data", page);
    }







    /**
     * 前端列表
     */
	@IgnoreAuth
    @RequestMapping("/list")
    public R list(@RequestParam Map<String, Object> params,NewsEntity news,
		HttpServletRequest request){
        EntityWrapper<NewsEntity> ew = new EntityWrapper<NewsEntity>();

		PageUtils page = newsService.queryPage(params, MPUtil.sort(MPUtil.between(MPUtil.likeOrEq(ew, news), params), params));
        Map<String, String> deSens = new HashMap<>();
        //给需要脱敏的字段脱敏
        DeSensUtil.desensitize(page,deSens);
        return R.ok().put("data", page);
    }

	/**
     * 列表
     */
    @RequestMapping("/lists")
    public R list( NewsEntity news){
       	EntityWrapper<NewsEntity> ew = new EntityWrapper<NewsEntity>();
      	ew.allEq(MPUtil.allEQMapPre( news, MPUtil.camelToSnake("news")));
        return R.ok().put("data", newsService.selectListView(ew));
    }

	 /**
     * 查询
     */
    @RequestMapping("/query")
    public R query(NewsEntity news){
        EntityWrapper< NewsEntity> ew = new EntityWrapper< NewsEntity>();
 		ew.allEq(MPUtil.allEQMapPre( news, MPUtil.camelToSnake("news")));
		NewsView newsView =  newsService.selectView(ew);
		return R.ok("查询新闻资讯成功").put("data", newsView);
    }
	
    /**
     * 后端详情
     */
    @RequestMapping("/info/{id}")
    public R info(@PathVariable("id") Long id){
        NewsEntity news = newsService.selectById(id);
		news = newsService.selectView(new EntityWrapper<NewsEntity>().eq("id", id));
        Map<String, String> deSens = new HashMap<>();
        //给需要脱敏的字段脱敏
        DeSensUtil.desensitize(news,deSens);
        return R.ok().put("data", news);
    }

    /**
     * 前端详情
     */
	@IgnoreAuth
    @RequestMapping("/detail/{id}")
    public R detail(@PathVariable("id") Long id){
        NewsEntity news = newsService.selectById(id);
		news = newsService.selectView(new EntityWrapper<NewsEntity>().eq("id", id));
        Map<String, String> deSens = new HashMap<>();
        //给需要脱敏的字段脱敏
        DeSensUtil.desensitize(news,deSens);
        return R.ok().put("data", news);
    }
    



    /**
     * 后端保存
     */
    @RequestMapping("/save")
    @SysLog("新增新闻资讯")
    public R save(@RequestBody NewsEntity news, HttpServletRequest request){
    	//ValidatorUtils.validateEntity(news);
        newsService.insert(news);
        return R.ok().put("data",news.getId());
    }
    
    /**
     * 前端保存
     */
    @SysLog("新增新闻资讯")
    @RequestMapping("/add")
    public R add(@RequestBody NewsEntity news, HttpServletRequest request){
    	//ValidatorUtils.validateEntity(news);
        newsService.insert(news);
        return R.ok();
    }


    /**
     * 修改
     */
    @RequestMapping("/update")
    @Transactional
    @SysLog("修改新闻资讯")
    public R update(@RequestBody NewsEntity news, HttpServletRequest request){
        //ValidatorUtils.validateEntity(news);
        newsService.updateById(news);//全部更新
        return R.ok();
    }



    

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @SysLog("删除新闻资讯")
    public R delete(@RequestBody Long[] ids){
        newsService.deleteBatchIds(Arrays.asList(ids));
        return R.ok();
    }

    	








}
