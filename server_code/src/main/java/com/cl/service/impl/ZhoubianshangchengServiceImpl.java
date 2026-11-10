package com.cl.service.impl;

import org.springframework.stereotype.Service;
import java.util.Map;
import java.util.List;

import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.cl.utils.PageUtils;
import com.cl.utils.Query;


import com.cl.dao.ZhoubianshangchengDao;
import com.cl.entity.ZhoubianshangchengEntity;
import com.cl.service.ZhoubianshangchengService;
import com.cl.entity.view.ZhoubianshangchengView;

@Service("zhoubianshangchengService")
public class ZhoubianshangchengServiceImpl extends ServiceImpl<ZhoubianshangchengDao, ZhoubianshangchengEntity> implements ZhoubianshangchengService {

    	
    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        Page<ZhoubianshangchengEntity> page = this.selectPage(
                new Query<ZhoubianshangchengEntity>(params).getPage(),
                new EntityWrapper<ZhoubianshangchengEntity>()
        );
        return new PageUtils(page);
    }
    
    @Override
	public PageUtils queryPage(Map<String, Object> params, Wrapper<ZhoubianshangchengEntity> wrapper) {
		  Page<ZhoubianshangchengView> page =new Query<ZhoubianshangchengView>(params).getPage();
	        page.setRecords(baseMapper.selectListView(page,wrapper));
	    	PageUtils pageUtil = new PageUtils(page);
	    	return pageUtil;
 	}
    
	@Override
	public List<ZhoubianshangchengView> selectListView(Wrapper<ZhoubianshangchengEntity> wrapper) {
		return baseMapper.selectListView(wrapper);
	}

	@Override
	public ZhoubianshangchengView selectView(Wrapper<ZhoubianshangchengEntity> wrapper) {
		return baseMapper.selectView(wrapper);
	}
	
	

    @Override
    public List<Map<String, Object>> selectValue(Map<String, Object> params, Wrapper<ZhoubianshangchengEntity> wrapper) {
        return baseMapper.selectValue(params, wrapper);
    }

    @Override
    public List<Map<String, Object>> selectTimeStatValue(Map<String, Object> params, Wrapper<ZhoubianshangchengEntity> wrapper) {
        return baseMapper.selectTimeStatValue(params, wrapper);
    }

    @Override
    public List<Map<String, Object>> selectGroup(Map<String, Object> params, Wrapper<ZhoubianshangchengEntity> wrapper) {
        return baseMapper.selectGroup(params, wrapper);
    }




}
